import isHotkey from "is-hotkey";
import React, { useCallback, useMemo, useState, Component } from "react";
import {
  Editor,
  Element as SlateElement,
  Transforms,
  createEditor,
} from "slate";
import { withHistory } from "slate-history";
import { Editable, Slate, useSlate, withReact } from "slate-react";
import { FaImage, FaLink } from "react-icons/fa";
import ReactMarkdown from "react-markdown";

// Error Boundary Component
class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-100 text-red-700 rounded-lg">
          Something went wrong: {this.state.error.message}. Please try again or
          contact support.
        </div>
      );
    }
    return this.props.children;
  }
}

// Hotkeys for formatting
const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};
const LIST_TYPES = ["numbered-list", "bulleted-list"];
const TEXT_ALIGN_TYPES = ["left", "center", "right", "justify"];

// Custom Components for Tabs
const WriteTab = ({ attributes, children }) => (
  <div {...attributes} className="p-4">
    {children}
  </div>
);

const PreviewTab = ({ attributes, children }) => (
  <div {...attributes} className="p-4">
    <ReactMarkdown className="prose max-w-none">{children}</ReactMarkdown>
  </div>
);

const GuidelinesTab = ({ attributes }) => (
  <div {...attributes} className="p-4">
    <p className="text-gray-600 text-sm">
      Please follow our community guidelines when writing and interacting with
      others.
    </p>
  </div>
);

// Block and Mark Buttons
const BlockButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <button
      className={`px-2 py-1 border border-gray-300 rounded text-sm ${isBlockActive(editor, format, isAlignType(format) ? "align" : "type") ? "bg-blue-100 text-blue-800" : "text-gray-600 hover:bg-gray-100"}`}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      {icon}
    </button>
  );
};

const MarkButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <button
      className={`px-2 py-1 border border-gray-300 rounded text-sm ${isMarkActive(editor, format) ? "bg-blue-100 text-blue-800" : "text-gray-600 hover:bg-gray-100"}`}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      {icon}
    </button>
  );
};

// Link Button
const LinkButton = () => {
  const editor = useSlate();
  const handleLink = () => {
    const url = prompt("Enter the URL:");
    if (url) {
      Transforms.wrapNodes(editor, {
        type: "link",
        url,
        children: [],
      });
      Transforms.collapse(editor, { edge: "end" });
    }
  };
  return (
    <button
      className="px-2 py-1 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-100"
      onMouseDown={(event) => {
        event.preventDefault();
        handleLink();
      }}
    >
      <FaLink />
    </button>
  );
};

const PublishingInterface = () => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [activeTab, setActiveTab] = useState("write");
  const [coverImage, setCoverImage] = useState(null);
  const [category, setCategory] = useState("Select Group");
  const [postType, setPostType] = useState("Create - Post");

  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  const handlePublish = () => {
    const draftData = {
      title,
      content: editor.children
        .map((node) => node.children.map((child) => child.text).join(""))
        .join("\n"),
      tags,
    };
    console.log("Publishing draft:", draftData);
    alert("Draft published (logged to console)!");
  };

  const handleCoverUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCoverImage(URL.createObjectURL(file));
    }
  };

  const addTag = () => {
    if (newTag.trim() && tags.length < 5) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleImageUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = () => {
      const file = input.files[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        const imageNode = {
          type: "image",
          url: imageUrl,
          children: [{ text: "" }],
        };
        Transforms.insertNodes(editor, imageNode);
      }
    };
    input.click();
  };

  const insertTabNode = (type) => {
    const tabNode =
      type === "write"
        ? { type: "write", children: [{ text: "" }] }
        : type === "preview"
          ? {
              type: "preview",
              children: [
                {
                  text: editor.children
                    .map((n) => n.children[0].text)
                    .join("\n"),
                },
              ],
            }
          : { type: "guidelines", children: [{ text: "" }] };
    Transforms.insertNodes(editor, tabNode);
    setActiveTab(type);
  };

  return (
    <div className="grid grid-cols-[200px,1fr,200px] h-screen bg-gray-100">
      {/* Left Sidebar */}
      <div className="bg-white shadow-md p-4">
        <p className="text-gray-600 text-center">SIDEBAR</p>
      </div>

      {/* Central Panel */}
      <div className="flex justify-center p-4 overflow-y-auto">
        <ErrorBoundary>
          <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-4">
            {/* Title Input */}
            <input
              type="text"
              placeholder="Title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            />

            {/* Controls */}
            <div className="flex gap-2 mb-4">
              <label className="border border-gray-300 p-2 rounded-lg flex items-center cursor-pointer text-sm text-gray-600 hover:bg-gray-50">
                <FaImage className="mr-2" />{" "}
                {coverImage ? "Cover Set" : "Set Cover"}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCoverUpload}
                  className="hidden"
                />
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border border-gray-300 p-2 rounded-lg text-sm text-gray-600 bg-white hover:bg-gray-50"
              >
                <option>Select Group</option>
                <option>Tech</option>
                <option>Design</option>
              </select>
              <select
                value={postType}
                onChange={(e) => setPostType(e.target.value)}
                className="border border-gray-300 p-2 rounded-lg text-sm text-gray-600 bg-white hover:bg-gray-50"
              >
                <option>Create - Post</option>
                <option>Draft</option>
              </select>
            </div>

            {/* Slate Editor with Tabs and Toolbar */}
            <Slate editor={editor} initialValue={initialValue}>
              {/* Tabs and Toolbar on the Same Line */}
              <div className="flex items-center justify-between mb-3 border-b border-gray-200">
                {/* Tabs */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => insertTabNode("write")}
                    className={`flex items-center gap-1 px-3 py-2 text-sm font-medium ${activeTab === "write" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600 hover:text-gray-800"}`}
                  >
                    <span>✏️</span> Write
                  </button>
                  <button
                    onClick={() => insertTabNode("preview")}
                    className={`flex items-center gap-1 px-3 py-2 text-sm font-medium ${activeTab === "preview" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600 hover:text-gray-800"}`}
                  >
                    <span>👁️</span> Preview
                  </button>
                  <button
                    onClick={() => insertTabNode("guidelines")}
                    className={`flex items-center gap-1 px-3 py-2 text-sm font-medium ${activeTab === "guidelines" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600 hover:text-gray-800"}`}
                  >
                    <span>📜</span> Code of Conduct
                  </button>
                </div>

                {/* Toolbar */}
                <div className="flex space-x-1">
                  <BlockButton format="heading-one" icon="H" />
                  <MarkButton format="bold" icon="B" />
                  <MarkButton format="italic" icon="I" />
                  <MarkButton format="underline" icon="U" />
                  <BlockButton format="block-quote" icon="¶" />
                  <LinkButton />
                  <button
                    onClick={handleImageUpload}
                    className="px-2 py-1 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-100"
                  >
                    <FaImage />
                  </button>
                  <BlockButton format="numbered-list" icon="1." />
                  <BlockButton format="bulleted-list" icon="•" />
                </div>
              </div>

              {/* Editable Area */}
              <div className="mb-4">
                <Editable
                  renderElement={renderElement}
                  renderLeaf={renderLeaf}
                  placeholder="Tell your story..."
                  className="border border-gray-300 rounded-lg p-3 h-40 overflow-y-auto focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500"
                  onKeyDown={(event) => {
                    for (const hotkey in HOTKEYS) {
                      if (isHotkey(hotkey, event)) {
                        event.preventDefault();
                        const mark = HOTKEYS[hotkey];
                        toggleMark(editor, mark);
                      }
                    }
                  }}
                />
              </div>
            </Slate>

            {/* Tags */}
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-2">
                Add or change tags (up to 5) so readers know what your story is
                about
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add a tag..."
                  className="border border-gray-300 p-2 rounded-lg flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={addTag}
                  className="border border-gray-300 p-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100"
                >
                  Add
                </button>
              </div>
              <div className="flex gap-2 mt-2 flex-wrap">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 px-2 py-1 rounded-lg text-sm text-gray-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={handlePublish}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
              >
                Publish
              </button>
              <button className="border border-gray-300 px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100">
                Cancel
              </button>
            </div>
          </div>
        </ErrorBoundary>
      </div>

      {/* Right Sidebar */}
      <div className="bg-white shadow-md p-4">
        <p className="text-gray-600 text-center">SIDEBAR</p>
      </div>
    </div>
  );
};

// Element and Leaf rendering
const Element = ({ attributes, children, element }) => {
  const style = {};
  if (isAlignElement(element)) {
    style.textAlign = element.align;
  }
  switch (element.type) {
    case "write":
      return <WriteTab attributes={attributes}>{children}</WriteTab>;
    case "preview":
      return <PreviewTab attributes={attributes}>{children}</PreviewTab>;
    case "guidelines":
      return <GuidelinesTab attributes={attributes} />;
    case "block-quote":
      return (
        <blockquote style={style} {...attributes}>
          {children}
        </blockquote>
      );
    case "bulleted-list":
      return (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      );
    case "heading-one":
      return (
        <h1 style={style} {...attributes}>
          {children}
        </h1>
      );
    case "list-item":
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      );
    case "numbered-list":
      return (
        <ol style={style} {...attributes}>
          {children}
        </ol>
      );
    case "link":
      return (
        <a href={element.url} style={style} {...attributes}>
          {children}
        </a>
      );
    case "image":
      return (
        <img
          src={element.url}
          alt="Uploaded"
          className="my-2 rounded-lg max-w-full h-auto"
          {...attributes}
        />
      );
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
  }
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }
  if (leaf.code) {
    children = <code>{children}</code>;
  }
  if (leaf.italic) {
    children = <em>{children}</em>;
  }
  if (leaf.underline) {
    children = <u>{children}</u>;
  }
  return <span {...attributes}>{children}</span>;
};

// Helper functions
const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(
    editor,
    format,
    isAlignType(format) ? "align" : "type",
  );
  const isList = isListType(format);
  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      isListType(n.type) &&
      !isAlignType(format),
    split: true,
  });
  let newProperties;
  if (isAlignType(format)) {
    newProperties = {
      align: isActive ? undefined : format,
    };
  } else {
    newProperties = {
      type: isActive ? "paragraph" : isList ? "list-item" : format,
    };
  }
  Transforms.setNodes(editor, newProperties);
  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);
  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isBlockActive = (editor, format, blockType = "type") => {
  const { selection } = editor;
  if (!selection) return false;
  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) => {
        if (!Editor.isEditor(n) && SlateElement.isElement(n)) {
          if (blockType === "align" && isAlignElement(n)) {
            return n.align === format;
          }
          return n.type === format;
        }
        return false;
      },
    }),
  );
  return !!match;
};

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const isAlignType = (format) => {
  return TEXT_ALIGN_TYPES.includes(format);
};

const isListType = (format) => {
  return LIST_TYPES.includes(format);
};

const isAlignElement = (element) => {
  return "align" in element;
};

const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];

export default PublishingInterface;
