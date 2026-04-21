document.addEventListener("DOMContentLoaded", function () {

  let icePricePerL = 0;

  const bevData = {
    Seagull: { range: 300, battery: 30 },
    Dolphin: { range: 405, battery: 44.9 },
    Atto3Premium: { range: 480, battery: 60.5 },
    Atto3Dynamic: { range: 410, battery: 49.9 },
    Emax7Superior: { range: 530, battery: 71.8 },
    Emax7Standard: { range: 420, battery: 55.4 },
    SealPerformance: { range: 580, battery: 82.6 },
    SealAdvanced: { range: 510, battery: 61.4 },
    Han: { range: 521, battery: 85.4 },
    Tang: { range: 530, battery: 108.8 }
  };

  window.updateICETitle = function () {
    let vehicle = document.getElementById("currentVehicle").value.trim();
    if (vehicle) {
      vehicle = vehicle.charAt(0).toUpperCase() + vehicle.slice(1).toLowerCase();
      document.getElementById("iceEquationTitle").innerHTML = `<b>${vehicle} Consumption</b>`;
    } else {
      document.getElementById("iceEquationTitle").innerHTML = `<b>ICE Consumption</b>`;
    }
  };

  window.updateICEPrice = function () {
    const fuelType = document.getElementById("fuelType").value;
    icePricePerL = fuelType === "gasoline" ? 100 :
                   fuelType === "diesel" ? 130 : 0;
    updateICEEquation();
  };

  window.updateICEEquation = function () {
    const fuelEconomy = parseFloat(document.getElementById("fuelEconomy").value);
    if (!fuelEconomy || !icePricePerL) return;

    const iceCost = icePricePerL / fuelEconomy;
    document.getElementById("iceEquation").innerHTML =
      `ICE cost/km: ₱${icePricePerL} / ${fuelEconomy} km/L = ₱${iceCost.toFixed(2)}/km`;
  };

  window.fillBEVData = function () {
    const model = document.getElementById("bevModel").value;
    if (model && bevData[model]) {
      document.getElementById("battery").value = bevData[model].battery;
      document.getElementById("evRange").value = bevData[model].range;
      updateBEVEquation();
    }
  };

  window.updateBEVEquation = function () {
    const battery = parseFloat(document.getElementById("battery").value);
    const range = parseFloat(document.getElementById("evRange").value);
    const rate = parseFloat(document.getElementById("electricRate").value);

    if (battery && range && rate) {
      const evCost = (battery * rate) / range;
      document.getElementById("bevEquation").innerHTML =
        `EV cost/km: (${battery} kWh × ₱${rate}/kWh) / ${range} km = ₱${evCost.toFixed(2)}/km`;
    }
  };

  window.computeSavings = function () {
    const fuelEconomy = parseFloat(document.getElementById("fuelEconomy").value);
    const yearlyKm = parseFloat(document.getElementById("yearlyKm").value);
    const battery = parseFloat(document.getElementById("battery").value);
    const range = parseFloat(document.getElementById("evRange").value);
    const rate = parseFloat(document.getElementById("electricRate").value);

    if (!fuelEconomy || !yearlyKm || !battery || !range || !icePricePerL) {
      alert("Please fill all required fields.");
      return;
    }

    const iceCost = icePricePerL / fuelEconomy;
    const evCost = (battery * rate) / range;
    const savings = (iceCost - evCost) * yearlyKm;

    document.getElementById("savingsEquation").innerHTML =
      `Yearly Savings: ₱${savings.toFixed(0)}`;
  };

});
