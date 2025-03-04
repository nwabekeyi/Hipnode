import React, { useContext } from 'react';
import ReactApexChart from 'react-apexcharts';  // Ensure this import is here
import { ThemeContext } from '../context/themeContext';

const ProjectStatictics = () => {
  const { theme, themeColors } = useContext(ThemeContext);

  const primaryColor = themeColors?.[theme]?.primary || "#1A56DB";
  const secondaryColor = themeColors?.[theme]?.secondary || "#7E3BF2";

  const options = {
    tooltip: {
      enabled: true,
      x: { show: true },
      y: { show: true },
    },
    grid: {
      show: true,
      borderColor: '#f7f7f7',  // Set grid borders to match the background
      strokeDashArray: 0,
    },
    series: [
      {
        name: "Developer Edition",
        data: [1500, 1418, 1456, 1526, 1356, 1256],
        color: "#3479e2",
      },
      {
        name: "Designer Edition",
        data: [643, 413, 765, 412, 1423, 1731],
        color: "#3479e2",
      },
    ],
    chart: {
      height: "100%",
      maxWidth: "120%",
      type: "area",
      background: "#f7f7f7",  // Set the background color of the chart itself
    },
    legend: { show: true },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
        shade: theme === "light" ? "#1C64F2" : "#2B3B4F",
      },
    },
    dataLabels: { enabled: false },
    stroke: { width: 6 },
    xaxis: {
      categories: ['01 February', '02 February', '03 February', '04 February', '05 February', '06 February', '07 February'],
    },
  };

  return (
    <div>
      <div className="max-w-sm w-full bg-white rounded-lg shadow-sm dark:bg-gray-800 p-4 md:p-6">
        {/* <div className="flex justify-between mb-5">
          <div>
            <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">Chats Statictics</h5>
            <p className="text-base font-normal text-gray-500 dark:text-gray-400">Your Profile Insights</p>
          </div>
          <div className="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 dark:text-green-500 text-center">
            23%
            <svg className="w-3 h-3 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13V1m0 0L1 5m4-4 4 4"/>
            </svg>
          </div>
        </div> */}
        {/* Chart container with background color #f7f7f7 */}
        <div className="bg-[#f7f7f7] p-4 rounded-lg shadow-md">
          <ReactApexChart options={options} series={options.series} type="area" height={350} />
        </div>
        <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between mt-5">
          <div className="flex justify-between items-center pt-5">
            {/* <button
              id="dropdownDefaultButton"
              data-dropdown-toggle="lastDaysdropdown"
              data-dropdown-placement="bottom"
              className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 text-center inline-flex items-center dark:hover:text-white"
              type="button">
              Last 7 days
              <svg className="w-2.5 m-2.5 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
              </svg>
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectStatictics;
