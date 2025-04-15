// src/components/ProfileModal.js
import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef,
} from "react";
import Modal from "./modal";
import { ThemeContext } from "../context/themeContext";
import { useAuth } from "../context/authContext";
import { format } from "date-fns";
import useApi from "../hooks/useApi";

const ProfileModal = ({ isOpen, onClose, userId }) => {
  const { themeColors } = useContext(ThemeContext);
  const { isAuthenticated } = useAuth();
  const [profileData, setProfileData] = useState({
    firstname: "",
    surname: "",
    username: "",
    email: "",
    bio: "",
    profilePicture: "https://via.placeholder.com/150",
    followers: [],
    following: [],
    createdAt: new Date(),
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [newBio, setNewBio] = useState("");
  const [isEditingProfilePic, setIsEditingProfilePic] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const hasFetchedRef = useRef(false);

  const {
    data: profileResponse,
    error: profileError,
    loading: profileLoading,
    execute: fetchProfile,
  } = useApi();

  const {
    data: uploadResponse,
    error: uploadError,
    loading: uploadLoading,
    execute: uploadProfilePic,
  } = useApi();

  console.log(uploadResponse, "Upload Error");

  const {
    data: bioResponse,
    error: bioError,
    loading: bioLoading,
    execute: updateBio,
  } = useApi();

  console.log(bioResponse, "Bio Response");
  useEffect(() => {
    if (!isOpen || !userId || !isAuthenticated || hasFetchedRef.current) return;

    hasFetchedRef.current = true; // Set early to prevent re-runs
    const fetchProfileData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        console.log("Fetching profile for userId:", userId);
        await fetchProfile(
          `https://hipnode-server.onrender.com/auth/${userId}`,
          "GET",
          null,
          { requiresAuth: true },
        );

        if (profileError) {
          throw new Error(profileError.message || "Failed to fetch profile");
        }
      } catch (err) {
        console.error("Profile fetch error:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [isOpen, userId, isAuthenticated, fetchProfile, profileError]);

  useEffect(() => {
    if (profileResponse?.user) {
      setProfileData({
        ...profileResponse.user,
        profilePicture:
          profileResponse.user.profilePicture ||
          "https://via.placeholder.com/150",
      });
      setNewBio(profileResponse.user.bio || "");
    }
  }, [profileResponse]);

  const handleFileChange = useCallback((e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file (JPEG, PNG, etc.)");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert("File size too large (max 5MB)");
        return;
      }
      console.log("File selected:", file.name);
      setSelectedFile(file);
    }
  }, []);

  const handleUpdateProfilePic = useCallback(async () => {
    if (!selectedFile) {
      alert("Please select a file to upload");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    const previewUrl = URL.createObjectURL(selectedFile);
    setProfileData((prev) => ({
      ...prev,
      profilePicture: previewUrl,
    }));

    try {
      const formData = new FormData();
      formData.append("profilePicture", selectedFile);

      console.log("FormData contents:");
      for (let [key, value] of formData.entries()) {
        console.log(
          key,
          value instanceof File
            ? `${value.name} (${value.type}, ${value.size} bytes)`
            : value,
        );
      }

      const onUploadProgress = (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total,
        );
        setUploadProgress(percentCompleted);
      };

      const response = await uploadProfilePic(
        `https://hipnode-server.onrender.com/auth/${userId}/profile-picture`,
        "PATCH",
        formData,
        { onUploadProgress, requiresAuth: true },
      );

      if (uploadError) {
        throw new Error(uploadError.message || "Profile picture update failed");
      }

      if (response?.profilePicture) {
        setProfileData((prev) => ({
          ...prev,
          profilePicture: response.profilePicture,
        }));
      }

      setIsEditingProfilePic(false);
      setSelectedFile(null);
      setUploadProgress(0);
    } catch (err) {
      console.error("Profile picture upload error:", err);
      setProfileData((prev) => ({
        ...prev,
        profilePicture:
          profileResponse?.user?.profilePicture ||
          "https://via.placeholder.com/150",
      }));
      alert(err.message || "Failed to update profile picture");
    } finally {
      setIsUploading(false);
    }
  }, [selectedFile, userId, uploadProfilePic, uploadError, profileResponse]);

  const handleUpdateBio = useCallback(async () => {
    if (!newBio.trim()) {
      alert("Bio cannot be empty");
      return;
    }

    setProfileData((prev) => ({
      ...prev,
      bio: newBio,
    }));
    setIsEditingBio(false);

    try {
      const response = await updateBio(
        `https://hipnode-server.onrender.com/auth/${userId}`,
        "PATCH",
        { bio: newBio },
        { requiresAuth: true },
      );

      if (bioError) {
        throw new Error(bioError.message || "Failed to update bio");
      }

      if (response?.bio) {
        setProfileData((prev) => ({
          ...prev,
          bio: response.bio,
        }));
      }
    } catch (err) {
      console.error("Bio update error:", err);
      setProfileData((prev) => ({
        ...prev,
        bio: profileResponse?.user?.bio || "",
      }));
      setIsEditingBio(true);
      alert(err.message || "Failed to update bio");
    }
  }, [newBio, userId, updateBio, bioError, profileResponse]);

  const cancelBioEditing = useCallback(() => {
    setIsEditingBio(false);
    setNewBio(profileData.bio || "");
  }, [profileData.bio]);

  const cancelProfilePicEditing = useCallback(() => {
    setIsEditingProfilePic(false);
    setSelectedFile(null);
    setUploadProgress(0);
  }, []);

  const handleRetry = useCallback(() => {
    hasFetchedRef.current = false;
    setError(null); // Trigger re-fetch by clearing error
  }, []);

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        hasFetchedRef.current = false;
        onClose();
      }}
      size="sm"
      position="top-right"
      height={"50"}
    >
      <div
        className="flex flex-col items-center p-4 overflow-hidden"
        style={{ minWidth: "300px" }}
      >
        {(isLoading || profileLoading) && (
          <div className="flex flex-col items-center justify-center h-40 w-full">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-2" style={{ color: themeColors.labelText }}>
              Loading profile...
            </p>
          </div>
        )}

        {(error || profileError) && (
          <div className="flex flex-col items-center justify-center h-40 w-full">
            <div className="text-red-500 mb-2">⚠️</div>
            <p style={{ color: themeColors.darkOrangeColor }}>
              {error || profileError?.message}
            </p>
            {error === "Please login to continue" ||
            error === "Please login to view this profile" ? (
              <button
                onClick={() => (window.location.href = "/login")}
                className="mt-2 px-3 py-1 rounded text-sm"
                style={{
                  backgroundColor: themeColors.buttonBlueBg,
                  color: themeColors.buttonSecondaryText,
                }}
              >
                Login to continue
              </button>
            ) : (
              <button
                onClick={handleRetry}
                className="mt-2 px-3 py-1 rounded text-sm"
                style={{
                  backgroundColor: themeColors.buttonBlueBg,
                  color: themeColors.buttonSecondaryText,
                }}
              >
                Retry
              </button>
            )}
          </div>
        )}

        {!isLoading && !profileLoading && !error && !profileError && (
          <>
            <div className="relative mb-4 w-full flex flex-col items-center">
              {isEditingProfilePic ? (
                <div className="flex flex-col items-center gap-3 w-full">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="text-sm w-full max-w-xs"
                    style={{
                      color: themeColors.textColor,
                      backgroundColor: themeColors.inputBgSecondary,
                      padding: "0.5rem",
                      borderRadius: "0.375rem",
                    }}
                    disabled={isUploading || uploadLoading}
                  />
                  {selectedFile && (
                    <div className="flex flex-col items-center gap-2">
                      <img
                        src={URL.createObjectURL(selectedFile)}
                        alt="Preview"
                        className="w-24 h-24 rounded-full border-4 object-cover"
                        style={{ borderColor: themeColors.secondaryColor }}
                      />
                      <p
                        className="text-sm"
                        style={{ color: themeColors.labelText }}
                      >
                        {selectedFile.name} (
                        {Math.round(selectedFile.size / 1024)} KB)
                      </p>
                    </div>
                  )}
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={handleUpdateProfilePic}
                      className="px-4 py-1 rounded-lg text-sm font-medium"
                      style={{
                        backgroundColor: themeColors.buttonBlueBg,
                        color: themeColors.buttonSecondaryText,
                      }}
                      disabled={isUploading || uploadLoading || !selectedFile}
                    >
                      {isUploading || uploadLoading ? (
                        <>
                          Uploading...{" "}
                          {uploadProgress > 0 && `${uploadProgress}%`}
                        </>
                      ) : (
                        "Save"
                      )}
                    </button>
                    <button
                      onClick={cancelProfilePicEditing}
                      className="px-4 py-1 rounded-lg text-sm border"
                      style={{
                        borderColor: themeColors.secondaryColor,
                        color: themeColors.textColor,
                      }}
                      disabled={isUploading || uploadLoading}
                    >
                      Cancel
                    </button>
                  </div>
                  {isUploading && uploadProgress > 0 && (
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="relative group">
                  <img
                    src={profileData.profilePicture}
                    alt={`${profileData.firstname} ${profileData.surname}'s profile`}
                    className="w-24 h-24 rounded-full border-4 object-cover"
                    style={{ borderColor: themeColors.secondaryColor }}
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/150";
                    }}
                  />
                  <button
                    onClick={() => setIsEditingProfilePic(true)}
                    className="absolute bottom-0 right-0 bg-white rounded-full w-8 h-8 flex items-center justify-center border-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      borderColor: themeColors.secondaryColor,
                      color: themeColors.buttonBlueBg,
                    }}
                    title="Edit profile picture"
                  >
                    ✏️
                  </button>
                </div>
              )}
            </div>

            <div className="w-full text-center mb-4">
              <h2
                className="text-2xl font-bold mb-1"
                style={{ color: themeColors.textColor }}
              >
                {profileData.firstname} {profileData.surname}
              </h2>
              <p className="text-sm" style={{ color: themeColors.labelText }}>
                @{profileData.username}
              </p>
            </div>

            <div className="w-full mb-4">
              {isEditingBio ? (
                <div className="flex flex-col gap-2">
                  <textarea
                    value={newBio}
                    onChange={(e) => setNewBio(e.target.value)}
                    placeholder="Tell us about yourself..."
                    className="w-full p-2 border rounded-lg text-sm focus:outline-none focus:ring-2"
                    style={{
                      borderColor: themeColors.secondaryColor,
                      backgroundColor: themeColors.inputBgSecondary,
                      color: themeColors.textColor,
                      minHeight: "100px",
                    }}
                    maxLength={500}
                  />
                  <div className="flex justify-between items-center">
                    <span
                      className="text-xs"
                      style={{ color: themeColors.labelText }}
                    >
                      {newBio.length}/500 characters
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={cancelBioEditing}
                        className="px-3 py-1 rounded text-sm border"
                        style={{
                          borderColor: themeColors.secondaryColor,
                          color: themeColors.textColor,
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleUpdateBio}
                        className="px-3 py-1 rounded text-sm font-medium"
                        style={{
                          backgroundColor: themeColors.buttonBlueBg,
                          color: themeColors.buttonSecondaryText,
                        }}
                        disabled={bioLoading}
                      >
                        {bioLoading ? "Saving..." : "Save"}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <p
                    className="text-sm text-center mb-2 px-4 py-2 rounded-lg w-full"
                    style={{
                      color: themeColors.textColor,
                      backgroundColor: themeColors.inputBgSecondary,
                      minHeight: "60px",
                    }}
                  >
                    {profileData.bio || "This user hasn't added a bio yet."}
                  </p>
                  <button
                    onClick={() => setIsEditingBio(true)}
                    className="text-sm flex items-center gap-1"
                    style={{ color: themeColors.buttonBlueBg }}
                  >
                    <span>✏️</span>
                    <span>{profileData.bio ? "Edit bio" : "Add bio"}</span>
                  </button>
                </div>
              )}
            </div>

            <div className="flex justify-around w-full mb-4">
              <div className="text-center px-4">
                <p
                  className="font-semibold"
                  style={{ color: themeColors.textColor }}
                >
                  {profileData.followers?.length?.toLocaleString() || 0}
                </p>
                <p className="text-xs" style={{ color: themeColors.labelText }}>
                  Followers
                </p>
              </div>
              <div className="text-center px-4">
                <p
                  className="font-semibold"
                  style={{ color: themeColors.textColor }}
                >
                  {profileData.following?.length?.toLocaleString() || 0}
                </p>
                <p className="text-xs" style={{ color: themeColors.labelText }}>
                  Following
                </p>
              </div>
              <div className="text-center px-4">
                <p
                  className="font-semibold"
                  style={{ color: themeColors.textColor }}
                >
                  {profileData.posts?.length?.toLocaleString() || 0}
                </p>
                <p className="text-xs" style={{ color: themeColors.labelText }}>
                  Posts
                </p>
              </div>
            </div>

            <div className="w-full text-center">
              <p className="text-xs" style={{ color: themeColors.labelText }}>
                Joined {format(new Date(profileData.createdAt), "MMMM yyyy")}
              </p>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default ProfileModal;
