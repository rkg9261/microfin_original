import React, { useState } from "react";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

import "./Dashboard.css";



// CENTER TEXT PLUGIN


const centerTextPlugin = {

  id: "centerText",

  afterDraw(chart) {

    const { ctx, chartArea } = chart;

    if (!chartArea) return;

    const dataset = chart.data.datasets[0];

    const centerValue = dataset.centerValue;
    const centerLabel = dataset.centerLabel;

    if (!centerValue) return;

    const centerX =
      (chartArea.left + chartArea.right) / 2;

    const centerY =
      (chartArea.top + chartArea.bottom) / 2;

    ctx.save();

    // MAIN VALUE
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillStyle = "#263548";

    ctx.font =
      "800 28px Arial, sans-serif";

    ctx.fillText(
      centerValue,
      centerX,
      centerY - 7
    );


    // LABEL
    if (centerLabel) {

      ctx.fillStyle = "#8793a3";

      ctx.font =
        "700 9px Arial, sans-serif";

      ctx.fillText(
        centerLabel,
        centerX,
        centerY + 22
      );

    }

    ctx.restore();

  },

};



// REGISTER CHART


ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  centerTextPlugin
);



// DASHBOARD


const Dashboard = () => {


 
  // BRANCH / SESSION
 

  const [branch, setBranch] = useState("all");

  const [session, setSession] = useState("2026-2027");
   


 
  // FORMAT MONEY
 

  const formatMoney = (value) => {

    return new Intl.NumberFormat("en-IN", {

      style: "currency",

      currency: "INR",

      maximumFractionDigits: 0,

    }).format(value);

  };


 
  // SUMMARY DATA
 

  const summaryCards = [

    {
      title: "TOTAL BALANCE",
      amount: 18997138,
      icon: "₹",
      background: "money",
      type: "green",
      description: "Current available balance",
    },

    {
      title: "BANK BALANCE",
      amount: 9487146,
      icon: "▣",
      background: "bank",
      type: "blue",
      description: "Available bank balance",
    },

    {
      title: "CASH BALANCE",
      amount: 9509992,
      icon: "₹",
      background: "cash",
      type: "orange",
      description: "Available cash balance",
    },

    {
      title: "SMS BALANCE",
      amount: 0,
      icon: "✦",
      background: "sms",
      type: "purple",
      description: "Available SMS credits",
    },

  ];


 
  // FINANCIAL DATA
 

  const financialCards = [

    {
      title: "TOTAL DISBURSEMENT",
      amount: 15153284,
      icon: "↗️",
      background: "disbursement",
      type: "green",
    },

    {
      title: "TOTAL OUTSTANDING",
      amount: 2941264,
      icon: "!",
      background: "outstanding",
      type: "red",
    },

    {
      title: "TOTAL COLLECTION",
      amount: 25439171,
      icon: "₹",
      background: "collection",
      type: "blue",
    },

    {
      title: "TOTAL INTEREST",
      amount: 3283178,
      icon: "%",
      background: "interest",
      type: "purple",
    },

  ];


 
  // ACTIVITY DATA
 

  const activityCards = [

    {
      title: "COLLECTION",
      subtitle: "APPROVED IN AMOUNT",
      type: "green",
      background: "collection",

      values: [

        ["TODAY", "₹0"],

        ["WEEKLY", "₹0"],

        ["MONTHLY", "₹825546"],

        ["TOTAL", "₹25439171"],

      ],

    },


    {
      title: "COLLECTION",
      subtitle: "PENDING IN AMOUNT",
      type: "red",
      background: "pending",

      values: [

        ["TODAY", "₹0"],

        ["WEEKLY", "₹0"],

        ["MONTHLY", "₹0"],

        ["TOTAL", "₹0"],

      ],

    },


    {
      title: "DISBURSEMENT",
      subtitle: "APPROVED IN AMOUNT",
      type: "blue",
      background: "disbursement",

      values: [

        ["TODAY", "₹0"],

        ["WEEKLY", "₹0"],

        ["MONTHLY", "₹200000"],

        ["TOTAL", "₹15153284"],

      ],

    },


    {
      title: "DISBURSEMENT",
      subtitle: "PENDING NUMBER OF LOANS",
      type: "cyan",
      background: "loan",

      values: [

        ["TODAY", "0"],

        ["WEEKLY", "0"],

        ["MONTHLY", "0"],

        ["TOTAL", "0"],

      ],

    },

  ];


 
  // PENDING RECORDS
 

  const pendingRecords = [

    [
      "PENDING NUMBER OF EMI TODAY",
      "6",
    ],

    [
      "PENDING AMOUNT OF EMI TODAY",
      "8868",
    ],

    [
      "PENDING NUMBER OF EMI TILL TODAY",
      "53",
    ],

    [
      "PENDING AMOUNT OF EMI TILL TODAY",
      "190685",
    ],

    [
      "TOTAL ACTIVE CUSTOMER",
      "366",
    ],

  ];


 
  // RECENT MEMBERS
 

  const recentMembers = [

    {
      id: 1,
      name: "ATUL BARANWAL",
      code: "01SLF10",
      mobile: "7286935646",
      address: "GORAKHPUR",
    },

    {
      id: 2,
      name: "DIPU I",
      code: "01SLF9",
      mobile: "8641821895",
      address: "KAINA",
    },

    {
      id: 3,
      name: "KKKKKK2",
      code: "01SLF8",
      mobile: "9612190182",
      address: "DIMAPUR",
    },

    {
      id: 4,
      name: "AMBEY",
      code: "01SLF7",
      mobile: "9554067072",
      address: "LUCKNOW",
    },

    {
      id: 5,
      name: "PAVAN RAVINDRA RATHOD",
      code: "01SLF6",
      mobile: "9373566160",
      address: "PACHORA",
    },

  ];


 
  // LOAN CHART
 

  const loanChartData = {

    labels: [

      "Outstanding Principal",

      "Total Principal",

      "Receive Principal",

    ],

    datasets: [

      {

        data: [

          5700000,

          12800000,

          6800000,

        ],

        backgroundColor: [

          "#e95b78",

          "#279bd2",

          "#13a66b",

        ],

        borderColor: "#ffffff",

        borderWidth: 3,

        hoverOffset: 12,

        centerValue: "317",

        centerLabel: "TOTAL LOANS",

      },

    ],

  };


 
  // OVERVIEW CHART
 

  const overviewChartData = {

    labels: [

      "Total Collection",

      "Total Interest",

      "Total Outstanding",

      "Total Disbursement",

    ],

    datasets: [

      {

        data: [

          8453730,

          1287450,

          1148056,

          11480956,

        ],

        backgroundColor: [

          "#19a849",

          "#7b43d0",

          "#df393f",

          "#19b5d0",

        ],

        borderColor: "#ffffff",

        borderWidth: 3,

        hoverOffset: 12,

        centerValue: "₹25.4L",

        centerLabel: "COLLECTION",

      },

    ],

  };


 
  // CHART OPTIONS
 

  const chartOptions = {

    responsive: true,

    maintainAspectRatio: false,

    cutout: "58%",

    plugins: {

      legend: {

        position: "bottom",

        labels: {

          usePointStyle: true,

          pointStyle: "circle",

          padding: 18,

          font: {

            size: 11,

            weight: "600",

          },

        },

      },


      tooltip: {

        enabled: true,

        backgroundColor: "#172033",

        titleColor: "#ffffff",

        bodyColor: "#ffffff",

        borderColor: "#ffffff",

        borderWidth: 1,

        padding: 12,

        cornerRadius: 8,

        displayColors: true,

        callbacks: {

          title: (items) => {

            return items[0].label;

          },

          label: (context) => {

            return ` Amount: ${formatMoney(
              context.parsed
            )}`;

          },

        },

      },

    },


    onHover: (event, elements) => {

      if (event.native) {

        event.native.target.style.cursor =
          elements.length
            ? "pointer"
            : "default";

      }

    },

  };


 
  return (

    <div className="mf-dashboard-page">


      {/*  HEADER*/}
         
       

      <div className="mf-dashboard-header">


        <div className="mf-dashboard-title">

          <div className="mf-dashboard-title-bar"></div>

          <div>

            <h1>Dashboard </h1>
            <p> Microfinance management overview</p>

          </div>

        </div>


        {/* SESSION + BRANCH */}

        <div className="mf-dashboard-filters">


          <div className="mf-filter-box">

            <label>   SESSION </label>

            <select
              value={session}
              onChange={(e) =>
                setSession(e.target.value)
              }  >
          

              <option value="2026-2027">
                2026-2027
              </option>

              <option value="2025-2026">
                2025-2026
              </option>

              <option value="2024-2025">
                2024-2025
              </option>

            </select>

          </div>


          <div className="mf-filter-box">

            <label>  BRANCH</label>

            <select
              value={branch}
              onChange={(e) =>
                setBranch(e.target.value)
              } >
           

              <option value="all">  All Branches</option>
              <option value="head-office"> Head Office</option>
              <option value="branch-1">Branch 01</option>
              <option value="branch-2">Branch 02 </option>
              <option value="branch-3">  Branch 03</option>

            </select>

          </div>

        </div>

      </div>


                             {/* SUMMARY*/}
          
       

      <div className="mf-summary-grid">

        {summaryCards.map((card) => (

          <div  className="mf-summary-card"   key={card.title}>

            <div className={`mf-summary-bg-image ${card.background}`}> </div>
 
            <div className={`mf-summary-icon ${card.type}`}> {card.icon}   </div>
             
            <div className="mf-summary-content">

              <span>
                {card.title}
              </span>

              <strong>
                {formatMoney(card.amount)}
              </strong>

              <small>
                {card.description}
              </small>

            </div>

          </div>

        ))}

      </div>


                {/*  FINANCIAL CARDS */}
         
      

      <div className="mf-financial-grid">

        {financialCards.map((card) => (

          <div
            className={`mf-financial-card ${card.type}`}
            key={card.title}
          >

            <div
              className={`mf-financial-bg-image ${card.background}`}
            ></div>


            <div className="mf-financial-icon">

              {card.icon}

            </div>


            <div className="mf-financial-content">

              <span>
                {card.title}
              </span>

              <strong>
                {formatMoney(card.amount)}
              </strong>

            </div>

          </div>

        ))}

      </div>


                     {/*  ACTIVITY*/}
         
       

      <div className="mf-activity-grid">

        {activityCards.map((card) => (

          <div
            className="mf-activity-card"
            key={card.subtitle}
          >

            <div
              className={`mf-activity-bg-image ${card.background}`}
            ></div>


            <div
              className={`mf-activity-header ${card.type}`}
            >

              <strong>
                {card.title}
              </strong>

              <span>
                {card.subtitle}
              </span>

            </div>


            <div className="mf-activity-body">

              {card.values.map(
                ([label, value]) => (

                  <div
                    className="mf-activity-row"
                    key={label}
                  >

                    <span>
                      {label}
                    </span>

                    <strong>
                      {value}
                    </strong>

                  </div>

                )
              )}

            </div>

          </div>

        ))}

      </div>


      {/* RECORDS*/}
          
       

      <div className="mf-records-grid">


        {/* PROFIT LOSS */}

        <div className="mf-panel">

          <div className="mf-panel-bg-image profit"></div>

          <div className="mf-panel-title">

            <span>
              ↗️
            </span>

            PROFIT-LOSS

          </div>


          <div className="mf-panel-row">

            <span>
              TOTAL INCOME
            </span>

            <strong>
              ₹9589997
            </strong>

          </div>


          <div className="mf-panel-row">

            <span>
              TOTAL EXPENSE
            </span>

            <strong>
              ₹833114
            </strong>

          </div>

        </div>


        {/* SETTLEMENT */}

        <div className="mf-panel">

          <div className="mf-panel-bg-image settlement"></div>

          <div className="mf-panel-title">

            <span>
              ↻
            </span>

            SETTLEMENT RECORD

          </div>


          <div className="mf-panel-row">

            <span>
              DUE AMOUNT
            </span>

            <strong>
              ₹234198
            </strong>

          </div>


          <div className="mf-panel-row">

            <span>
              PAID AMOUNT
            </span>

            <strong>
              ₹201430
            </strong>

          </div>

        </div>


        {/* LOAN RECORD */}

        <div className="mf-panel mf-loan-panel">

          <div className="mf-panel-bg-image loan"></div>

          <div className="mf-panel-title">

            <span> ▤ </span>
              LOAN RECORD
            </div>

          <div className="mf-loan-grid">

            <div>

              <span>  ACTIVE LOAN </span>
              <strong>92</strong>
            </div>
            <div>

              <span>  COMPLETE LOAN</span>
              <strong> 205  </strong>
 
            </div>


            <div>

              <span>     SETTLED LOAN </span>
              <strong>   20 </strong>
            </div>


            <div>

              <span>     PRINCIPAL OUTSTANDING </span>

              <strong> 110135  </strong>
            </div>

          </div>

        </div>

      </div>


      {/*   LOWER GRID */}
        
      

      <div className="mf-lower-grid">


        {/* PENDING */}

        <div className="mf-panel">

          <div className="mf-panel-bg-image pending"></div>


          <div className="mf-panel-title">

            <span>
              ↻
            </span>

            PENDING RECORDS

          </div>


          {pendingRecords.map(
            ([label, value]) => (

              <div
                className="mf-pending-row"
                key={label}>
              

                <span> {label}</span>
                <strong> {value} </strong>

              </div>

            )
          )}

        </div>


        {/* RECENT MEMBERS */}

        <div className="mf-panel mf-members-panel">

          <div className="mf-panel-bg-image members"></div>


          <div className="mf-panel-title">

            <span>♟  </span>
              
          

            RECENT MEMBERS

          </div>


          <div className="mf-table-wrapper">

            <table>

              <thead>

                <tr>

                  <th>   SR. NO.</th>
                  <th>   CUST NAME </th>
                  <th>CUST CODE</th>
                  <th>MOBILE </th>
                  <th> ADDRESS </th>
                </tr>

              </thead>


              <tbody>

                {recentMembers.map(
                  (member) => (

                    <tr key={member.id}>

                      <td>
                        {member.id}
                      </td>

                      <td className="mf-member-name">
                        ● {member.name}
                      </td>

                      <td>
                        {member.code}
                      </td>

                      <td>
                        {member.mobile}
                      </td>

                      <td>
                        {member.address}
                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>


                         {/*  CHARTS*/}
         
       

      <div className="mf-chart-grid">


        {/* LOAN RECORDS */}

        <div className="mf-chart-card">

          <div className="mf-chart-bg-image loan-chart"></div>


          <div className="mf-chart-header">

            <div className="mf-chart-header-icon"> ◉</div>
 
            <div>

              <h3> LOAN RECORDS</h3>
              <p>  Principal distribution </p>
            </div>

          </div>


          <div className="mf-chart-container">

            <Doughnut
              data={loanChartData}
              options={chartOptions}
            />

          </div>

        </div>


                          {/* OVERVIEW */}

        <div className="mf-chart-card">

          <div className="mf-chart-bg-image overview-chart"></div>


          <div className="mf-chart-header">

            <div className="mf-chart-header-icon">
              ◉
            </div>

            <div>

              <h3>OVERVIEW  </h3>
              <p> Financial distribution </p>
            </div>

          </div>


          <div className="mf-chart-container">

            <Doughnut
              data={overviewChartData}
              options={chartOptions}
            />

          </div>

        </div>

      </div>


    </div>

  );

};


export default Dashboard;