import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ShippingForm.css";
import axios from "axios";
import Select from "react-select";
import {useLocation} from "react-router-dom"


const ShippingForm = () => {
  const location = useLocation();
  const [quotation, setQuotation] = useState(null);
  const [origin, setOrigin] = useState("India");
  const [destination, setDestination] = useState('');
  const [productValue, setProductValue] = useState("");
  const [destinationOptions, setDestinationOptions] = useState([]);
  const [weights, setWeights] = useState([""]);
  const [boxDimensions, setBoxDimensions] = useState([
    { length: "", width: "", height: "" },
  ]);
  const [pieces, setPieces] = useState([""]);
  const [type, setType] = useState("None");
  const [packetType, setPacketType] = useState("None");
  const [disableType, setDisableType] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [weightWarning, setWeightWarning] = useState(false);
  const [stackability, setStackability] = useState("None");
  const [dutiesTaxes, setDutiesTaxes] = useState("None");
  const [data, setData] = useState(null);
  const [chargeableWeight, setChargeableWeight] = useState(0);
  const [totalPackages, setTotalPackages] = useState(0);
  const [commodity, setCommodity] = useState("None");
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Access quotation data from location state
    if (location.state && location.state.quotation) {
      setQuotation(location.state.quotation);
      // You can set other state variables using quotation data here
      setDestination(location.state.quotation.dataToStore.formData.destination);
      setProductValue(location.state.quotation.dataToStore.formData.productValue);
      setCommodity(location.state.quotation.dataToStore.formData.commodity)
      setType(location.state.quotation.dataToStore.formData.type)
      setDutiesTaxes(location.state.quotation.dataToStore.formData.dutiesTaxes)
      setBoxDimensions(location.state.quotation.dataToStore.formData.boxDimensions)
      setData(location.state.quotation.dataToStore.formData.data)
      // setServices(location.state.quotation.dataToStore.formData.serv
      setStackability(location.state.quotation.dataToStore.formData.stackability)
      setPacketType(location.state.quotation.dataToStore.formData.packetType)
      setPieces(location.state.quotation.dataToStore.formData.pieces)
      setWeights(location.state.quotation.dataToStore.formData.weights)
      setSelectedOptions(location.state.quotation.dataToStore.formData.selectedOptions)
      // Set other state variables as needed
    }
  }, [location.state]);

  const valueAddedServicesOptions = [
    { label: "Fumigation", value: "Fumigation" },
    { label: "Normal COC/COO/GSP", value: "Normal COC/COO/GSP" },
    { label: "Comprehensive COC/COO/GSP", value: "Comprehensive COC/COO/GSP" },
    { label: "Phytosanitary Certificate", value: "Phytosanitary Certificate" },
    {
      label: "IEC & AD Code Registration",
      value: "IEC & AD Code Registration",
    },
    { label: "Palletization", value: "Palletization" },
    { label: "Repacking", value: "Repacking" },
    { label: "Steel Strapping", value: "Steel Strapping" },
    { label: "Plastic Strapping", value: "Plastic Strapping" },
    { label: "Shrink Wrap", value: "Shrink Wrap" },
  ];

  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelectChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };

  useEffect(() => {
    // Fetch destination options from API
    fetch("http://3.109.157.15:5000/api/countries")
      .then((response) => response.json())
      .then((data) => setDestinationOptions(data))
      .catch((error) =>
        console.error("Error fetching destination options:", error)
      );
  }, []);

  // Function For Total Chargable Weight and no of pices
  useEffect(() => {
    const calculateChargeableWeight = () => {
      let totalVolumetricWeight = 0;
      let totalChargeableWeight = 0;
      boxDimensions.forEach((dim, index) => {
        const volume = dim.length * dim.width * dim.height;
        const volumetricWeight = volume / 5000;
        console.log(volumetricWeight);
        const actualweights = parseFloat(weights[index]);
        totalVolumetricWeight += Math.max(volumetricWeight, actualweights);
        // totalChargeableWeight = totalVolumetricWeight * parseInt(pieces[index]);
        totalChargeableWeight +=
          Math.max(volumetricWeight, actualweights) * parseInt(pieces[index]);
      });
      // const totalChargeableWeight = totalVolumetricWeight * pieces.reduce((acc, piece) => acc + parseInt(piece), 1);
      setChargeableWeight(totalChargeableWeight);
    };
    calculateChargeableWeight();
  }, [boxDimensions, weights, pieces]);
  useEffect(() => {
    const calculateTotalPackages = () => {
      let total = 0;
      pieces.forEach((piece) => {
        if (piece !== "") {
          total += parseInt(piece);
        }
      });
      setTotalPackages(total);
    };
    calculateTotalPackages();
  }, [pieces]);

  const user = JSON.parse(localStorage.getItem('user'));

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/submitForm");
      let data = response.data; // Assuming the API returns an array of services
      console.log("received", data)

      // Assuming the API returns data in the format [{withgst, fixchargedhl, ...}, {withgstfedex, fixchargefedex, ...}, {withgstups, fixchargeups, ...}]
      // We need to sort this array based on the GST-inclusive prices
      data = data.sort((a, b) => {
        // Normalize keys and compare
        const priceA = a.data.withgst || a.data.withgstfedex || a.data.withgstups;
        const priceB = b.data.withgst || b.data.withgstfedex || b.data.withgstups;
        return parseFloat(priceA) - parseFloat(priceB);
      });

      setServices(data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      stackability !== "None" &&
      dutiesTaxes !== "None" &&
      commodity !== "None" &&
      type !== "None" &&
      packetType !== "None"
    ) {
      setDisableSubmit(false);
    } else {
      setDisableSubmit(true);
    }
  }, [
    stackability,
    dutiesTaxes,
    packetType,
    weights,
    commodity,
    type,
    selectedOptions,
  ]);

  const handleSubmit = async (e, status) => {
    e.preventDefault();
    const formData = {
      origin,
      destination,
      productValue,
      weights,
      boxDimensions,
      pieces,
      type,
      packetType,
      stackability,
      dutiesTaxes,
      commodity,
      selectedOptions,
      status,
    };
    console.log("Form submitted with status:", status);
    console.log("Form data:", formData); // Log the form data
    try {
      const response = await axios.post(
        "http://localhost:5000/api/submitForm",
        { ...formData } // Include status in form data
      );
      console.log(response.data);
      setData(response.data);
      setSubmitted(true); // Set submitted state to true after form submission
    } catch (err) {
      console.error(`Error! ${err}`);
    }
    
    if (status === 'submit') {
      return;
    }
    if (status === 'confirm' || status === 'draft') {
      const dataToStore = {
        formData,
        data,
        userEmail: user.userData.email,
        userUid: user.userData.uid,
        userWorkspace: user.userData.workspace,
        status: status === 'confirm' ? 'confirm' : (status === 'draft' ? 'draft' : null), // Set status based on the button pressed
      };

      try{
      const response = await axios.post(
        "http://localhost:5000/api/sendData",
        { dataToStore } // Include status in form data
      );
      console.log(response.data);
      // setData(response.data);
      // setSubmitted(true); // Set submitted state to true after form submission
    } catch (err) {
      console.error(`Error! ${err}`);
    }
    console.log(dataToStore)
  }

    fetchData();
  };
 
  const handleConfirm = async (e) => {
    await handleSubmit(e, "confirm");
  };
 
  const handleDraft = async (e) => {
    await handleSubmit(e, "draft");
  };

  const labelMap = {
    fixchargedhl: "Basic Freight",
    custommchargedhl: "Customs Clearance Charge",
    oversizeSurChargeDhl: "Additional Handling Surcharges",
    dutitaxdhl: "DDP Charges",
    elevatedriskchargedhl: "Elevated Risk Surcharges",
    restrictedcountrychargedhl: "Restricted Country Surcharges",
    fuelsurcharge: "Fuel Surcharge (%)",
    fuelchargedhl: "Fuel Surcharge (INR)",
    stackdhl: "Non-Stackable Charges",
    totalPriceWithSurdhl: "Total Excl. GST",
    gst: "GST (%)",
    gst3: "GST (INR)",
    withgst: "Total Incl. GST",
    Commodity: "Commodity",
    v1: "VAS",

    fixchargefedex: "Basic Freight",
    custommchargefedex: "Customs Clearance Charge",
    oversizesurchargefedex: "Additional Handling Surcharges",
    dutitaxfedex: "DDP Charges",
    elevatedriskchargefedex: "Elevated Risk Surcharge",
    restrictedcountrychargefedex: "Restricted Country Charge",
    fuelsurchargefedex: "Fuel Surcharge (%)",
    fuelcharge: "Fuel Surcharge (INR)",
    stackfedex: "Non-Stackable Charge",
    totalPriceWithSurfedex: "Total Excl. GST",
    gstfedex: "GST (%)",
    gst2: "GST (INR)",
    withgstfedex: "Total Incl. GST",
    Commodity: "Commodity",
    v2: "VAS",

    fixchargeups: "Basic Freight",
    custommchargeups: "Customs Clearance Charge",
    oversizesurchargeups: "Additional Handling Surcharges",
    dutitaxups: "DDP Charges",
    elevatedriskchargeups: "Elevated Risk Surcharge",
    restrictedcountrychargeups: "Restricted Country Charge",
    fuelsurchargeups: "Fuel Surcharge (%)",
    fueltax: "Fuel Surcharge (INR)",
    totalPriceWithSurups: "Total Excl. GST",
    stackups: "Non-Stackable Charge",
    gstups: "GST",
    gst1: "GST (INR)",
    withgstups: "Total Including GST",
    Commodity: "Commodity",
    v3: "VAS",
};

  const handleOriginChange = (e) => {
    const value = e.target.value;
    if (!/^[a-zA-Z\s]*$/.test(value)) {
      setOrigin(value);
    }
  };

  const handleDestinationChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setDestination(value);
    }
  };

  const handleProductValueChange = (e) => {
    const value = e.target.value;
    // Allow only numeric characters, disallowing strings and special characters
    if (/^\d*$/.test(value) && value.charAt(0) !== "0") {
      setProductValue(value);
      if (parseFloat(value) > 25000) {
        setType("Commercial");
        setDisableType(true);
      } else {
        setType("None");
        setDisableType(false);
      }
    }
  };

  const handleDisplayLabel = (key) => labelMap[key] || key.replace(/([a-z])([A-Z])/g, '$1 $2');


  const handleWeightChange = (index, value) => {
    // Allow only numeric characters, disallowing strings and special characters
    if (/^\d*\.?\d*$/.test(value) && value.charAt(0) !== 0) {
      const newweights = [...weights];
      newweights[index] = value;
      setWeights(newweights);
      const sweight = newweights.reduce(
        (acc, curr) => acc + parseFloat(curr),
        0
      );
      console.log(sweight);
      if (sweight >= 70) {
        setWeightWarning(true);
      } else {
        setWeightWarning(false);
      }
    }
  };

  const handleBoxDimensionChange = (index, dimension, value) => {
    // Allow only numeric characters, disallowing strings and special characters
    if (/^\d*$/.test(value)) {
      // Numeric values should not start with 0
      if (value === "" || value.charAt(0) !== "0") {
        const newDimensions = [...boxDimensions];
        newDimensions[index] = { ...newDimensions[index], [dimension]: value };
        setBoxDimensions(newDimensions);
      }
    }
  };

  const handlePiecesChange = (index, value) => {
    const newPieces = [...pieces];
    newPieces[index] = Math.max(0, parseInt(value)) || "";
    setPieces(newPieces);
    const totalWeight = newPieces.reduce(
      (acc, curr, idx) => acc + parseFloat(curr) * parseFloat(weights[idx]),
      0
    );
    if (totalWeight >= 70) {
      setWeightWarning(true);
    } else {
      setWeightWarning(false);
    }
  };

  const addPackage = () => {
    const newBoxDimensions = [
      ...boxDimensions,
      { length: "", width: "", height: "" },
    ];
    const newPieces = [...pieces, ""];
    const newweights = [...weights, ""];
    setBoxDimensions(newBoxDimensions);
    setPieces(newPieces);
    setWeights(newweights);
    // Check if the current type is not 'Commercial', then enable the fields
    if (type !== "Commercial") {
      setDisableType(false);
    }
    // Check if the current weight is not exceeding 70kg, then enable the submit button
    if (parseFloat(weights[weights.length - 1]) <= 70) {
      setDisableSubmit(false);
      setWeightWarning(false);
    }
  };

  const removePackage = () => {
    if (boxDimensions.length > 1) {
      const newBoxDimensions = [...boxDimensions];
      const newPieces = [...pieces];
      const newweights = [...weights];
      newBoxDimensions.pop();
      newPieces.pop();
      newweights.pop();
      setBoxDimensions(newBoxDimensions);
      setPieces(newPieces);
      setWeights(newweights);
    }
  };

  const fetchDestinationOptions = () => {
    // Fetch destination options from API
    fetch("http://localhost:5000/api/countries")
      .then((response) => response.json())
      .then((data) => setDestinationOptions(data))
      .catch((error) =>
        console.error("Error fetching destination options:", error)
      );
  };

  const handleRecalculate = () => {
    
    fetchDestinationOptions();
    setSubmitted(false); // Set submitted state to true after form submission
  };

  const handleRefresh = () => {
    //Reset all state values to their initial state
    setOrigin("India");
    setDestination("");
    setProductValue("");
    setDestinationOptions([]);
    setWeights([""]);
    setBoxDimensions([{ length: "", width: "", height: "" }]);
    setPieces([""]);
    setType("None");
    setPacketType("None");
    setDisableType(false);
    setDisableSubmit(false);
    setWeightWarning(false);
    setStackability("None");
    setDutiesTaxes("None");
    setData(null);
    setChargeableWeight(0);
    setTotalPackages(0);
    setCommodity("None");
    setSelectedOptions([]);
    setServices([]);
    setError(null);
    setLoading(true);
    fetchDestinationOptions();
    setSubmitted(false);
  };

  const handleSaveFormData = () => {
    const isSaved = document.getElementById("saveFormData").checked;
    if (isSaved) {
      const formData = {
        origin,
        destination,
        productValue,
        weights,
        boxDimensions,
        pieces,
        type,
        packetType,
        stackability,
        dutiesTaxes,
        commodity,
        selectedOptions,
        services,
      };
      console.log("Form data saved:", formData, services);
      // Now you can perform further actions such as saving formData to the backend
    }
  };

  return (
    <div>
      {!submitted && (
        <form className="shipping-form" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Origin:</label>
            <input
              type="text"
              placeholder="Enter origin"
              className="form-control"
              value={origin}
              onChange={handleOriginChange}
              required
              readOnly={true}
              style={{ pointerEvents: "none" }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Destination:</label>
            <select
              className="form-select"
              value={destination}
              onChange={handleDestinationChange}
              required
            >
              <option value="">Select Destination</option>
              {destinationOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Value of the product (INR):</label>
            <input
              type="text"
              className="form-control"
              value={productValue}
              onChange={handleProductValueChange}
              required
            />
          </div>
          <div className="packages-container">
            {weights.map((weight, index) => (
              <div key={index} className="package">
                <label className="form-label">
                  Weight of the package (kg):
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={weight}
                  onChange={(e) => handleWeightChange(index, e.target.value)}
                  required
                />
                {weightWarning && (
                  <div className="text-danger">
                    Warning: Weight exceeds 70kg
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="packages-container">
            {boxDimensions.map((dimension, index) => (
              <div key={index} className="package">
                <div className="box-dimensions">
                  <label className="form-label">Box Dimensions (in cm):</label>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Length"
                      value={dimension.length}
                      onChange={(e) =>
                        handleBoxDimensionChange(
                          index,
                          "length",
                          e.target.value
                        )
                      }
                      required
                    />
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Width"
                      value={dimension.width}
                      onChange={(e) =>
                        handleBoxDimensionChange(index, "width", e.target.value)
                      }
                      required
                    />
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Height"
                      value={dimension.height}
                      onChange={(e) =>
                        handleBoxDimensionChange(
                          index,
                          "height",
                          e.target.value
                        )
                      }
                      required
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="packages-container">
            {boxDimensions.map((dimension, index) => (
              <div key={index} className="package">
                <div className="pieces">
                  <label className="form-label">No. of pieces:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={pieces[index]}
                    onChange={(e) => handlePiecesChange(index, e.target.value)}
                    required
                  />
                </div>
              </div>
            ))}
            <div className="add-remove-package-links">
              <a href="#" onClick={addPackage}>
                Add More Packages
              </a>
              <span> | </span>
              <a href="#" onClick={removePackage}>
                Remove
              </a>
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Type:</label>
            <select
              className="form-select"
              value={type}
              onChange={(e) => setType(e.target.value)}
              disabled={disableType}
            >
              <option value="None">None</option>
              <option value="Sample">Sample</option>
              <option value="Commercial">Commercial</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Packet Type:</label>
            <select
              className="form-select"
              value={packetType}
              onChange={(e) => setPacketType(e.target.value)}
            >
              <option value="None">None</option>
              <option value="Envelope">Envelope</option>
              <option value="Pak/Document">Pak/Document</option>
              <option value="Package/Non-Document">Package/Non-Document</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Stackable/Non-Stackable:</label>
            <select
              className="form-select"
              value={stackability}
              onChange={(e) => setStackability(e.target.value)}
            >
              <option value="None">None</option>
              <option value="Stackable">Stackable</option>
              <option value="Non-Stackable">Non-Stackable</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Duties and Taxes:</label>
            <select
              className="form-select"
              value={dutiesTaxes}
              onChange={(e) => setDutiesTaxes(e.target.value)}
            >
              <option value="None">None</option>
              <option value="DDP">DDP</option>
              <option value="DDU">DDU</option>
            </select>
          </div>

          {/* Commodity */}
          <div className="mb-3">
            <label className="form-label">Commodity</label>
            <select
              className="form-select custom-dropdown"
              value={commodity}
              onChange={(e) => setCommodity(e.target.value)}
            >
              <option value="None">None</option>

              {/* General Goods */}
              <option value="General Goods">General Goods</option>

              {/* Dangerous Goods */}

              <option value="Explosives">Explosives</option>
              <option value="Gases">Gases</option>
              <option value="Flammable Liquids">Flammable Liquids</option>
              <option value="Flammable Solids">Flammable Solids</option>
              <option value="Oxidizers and Organic Peroxides">
                Oxidizers and Organic Peroxides
              </option>
              <option value="Toxic & Infectious Substances">
                Toxic & Infectious Substances
              </option>
              <option value="Radioactive Material">Radioactive Material</option>
              <option value="Corrosives">Corrosives</option>
              <option value="Miscellaneous e.g. Magnets a danger to airplane equipment">
                Miscellaneous e.g. Magnets a danger to airplane equipment
              </option>

              {/* Prohibited Goods not permitted to book in any network */}
              <option value="Live Stock and its Articles">
                Live Stock and its Articles
              </option>
              <option value="Activated SIM cards">Activated SIM cards</option>
              <option value="Air guns, replica and imitation firearms">
                Air guns, replica and imitation firearms
              </option>
              <option value="Alcohol/tobacco/drugs/poisonous goods">
                Alcohol/tobacco/drugs/poisonous goods
              </option>
              <option value="Animal Raw Skins/Furs">
                Animal Raw Skins/Furs
              </option>
              <option value="Antiques (objects over 100 years old)">
                Antiques : objects over 100 years old
              </option>
              <option value="APO ( Army Post Office ) / FPO ( Fleet Post Office )/DPO (Diplomatic Post Office) Addresses">
                APO ( Army Post Office ) / FPO ( Fleet Post Office )/DPO
                (Diplomatic Post Office) Addresses
              </option>
              <option value="Arms & Ammunitions">Arms & Ammunitions</option>
              <option value="Asbestos">Asbestos</option>
              <option value="Biological Substance, Category B">
                Biological Substance, Category B
              </option>
              <option value="Bullion (of any precious metal)">
                Bullion (of any precious metal)
              </option>
              <option value="Contraband including, but not limited to, illicit drugs and counterfeit goods">
                Contraband including, but not limited to, illicit drugs and
                counterfeit goods
              </option>
              <option value="Corrosive items (acids, chemicals), radioactive material">
                Corrosive items (acids, chemicals), radioactive material
              </option>
              <option value="Cremated or Disinterred Human Remains">
                Cremated or Disinterred Human Remains
              </option>
              <option value="Currency, Cheques, Bullion, Payment Cards, Traveler Cheques, Stamps">
                Currency, Cheques, Bullion, Payment Cards, Traveler Cheques,
                Stamps
              </option>
              <option value="Dangerous goods and Hazardous material prohibited or restricted by IATA /ICAO and other Government or Regulatory Agencies">
                Dangerous goods and Hazardous material prohibited or restricted
                by IATA /ICAO and other Government or Regulatory Agencies
              </option>
              <option value="Dry Ice">Dry Ice</option>
              <option value="Drugs - Cocaine, Cannabis resin, LSD, Narcotics, Morphine, Opium, Psychotropic substances, etc.">
                Drugs - Cocaine, Cannabis resin, LSD, Narcotics, Morphine,
                Opium, Psychotropic substances, etc.
              </option>
              <option value="Edible Oils, De-oiled groundnut cakes, Fodder and Rice bran">
                Edible Oils, De-oiled groundnut cakes, Fodder and Rice bran
              </option>
              <option value="Electronic cigarettes">
                Electronic cigarettes
              </option>
              <option value="Endangered species/plants and its parts under CITES">
                Endangered species/plants and its parts under CITES
              </option>
              <option value="Explosives (arms, ammunition, fireworks, flares, gunpowder, airbag inflators)">
                Explosives (arms, ammunition, fireworks, flares, gunpowder,
                airbag inflators)
              </option>
              <option value="Fire extinguishers">Fire extinguishers</option>
              <option value="Fireworks and Other items of an incendiary or Flammable nature">
                Fireworks and Other items of an incendiary or Flammable nature
              </option>
              <option value="Flammable items (fire crackers, oil cans, adhesives, paint cans)">
                Flammable items (fire crackers, oil cans, adhesives, paint cans)
              </option>
              <option value="Gambling devices, lottery tickets.">
                Gambling devices, lottery tickets.
              </option>
              <option value="Gold, Silver, Platinum, Articles of Gem & Jewelry">
                Gold, Silver, Platinum, Articles of Gem & Jewelry
              </option>
              <option value="Gases compressed, liquefied or dissolved under pressure">
                Gases compressed, liquefied or dissolved under pressure
              </option>
              <option value="Hazarous Waste, including but not limited to Used Hypodermic Needles and/or Syringes or Medical waste">
                Hazarous Waste, including but not limited to Used Hypodermic
                Needles and/or Syringes or Medical waste
              </option>
              <option value="High capacity batteries such as car batteries, generator batteries">
                High capacity batteries such as car batteries, generator
                batteries
              </option>
              <option value="Human and Animal Embryos,">
                Human and Animal Embryos,
              </option>
              <option value="Human and animal remains, including ashes">
                Human and animal remains, including ashes
              </option>
              <option value="Human Corpses, Organs or Body Parts.">
                Human Corpses, Organs or Body Parts.
              </option>
              <option value="Hunting (animal) trophies,">
                Hunting (animal) trophies,
              </option>
              <option value="Indian Postal Articles">
                Indian Postal Articles
              </option>
              <option value="Industrial Diamonds">Industrial Diamonds</option>
              <option value="Ivory and ivory products">
                Ivory and ivory products
              </option>
              <option value="Ketamine and other Drugs of Illegal Narcotics (contraband) and Psychotropic substances">
                Ketamine and other Drugs of Illegal Narcotics (contraband) and
                Psychotropic substances
              </option>
              <option value="Knives">Knives</option>
              <option value="LEDs, LCDs, plasma, OLED and any kind of television screens">
                LEDs, LCDs, plasma, OLED and any kind of television screens
              </option>
              <option value="Letter of Credit/Bill of Lading">
                Letter of Credit/Bill of Lading
              </option>
              <option value="Liquid Chemicals and other liquid products">
                Liquid Chemicals and other liquid products
              </option>
              <option value="Lottery tickets and gambling devices where prohibited by law.">
                Lottery tickets and gambling devices where prohibited by law.
              </option>
              <option value="Machinery parts containing oil, grease, fuel or batteries">
                Machinery parts containing oil, grease, fuel or batteries
              </option>
              <option value="Magnetized material">Magnetized material</option>
              <option value="Marijuana, including Marijuana intended for medical use">
                Marijuana, including Marijuana intended for medical use
              </option>
              <option value="Meat and Edible Meat of all kinds">
                Meat and Edible Meat of all kinds
              </option>
              <option value="Narcotic drugs and Psychotropic substances">
                Narcotic drugs and Psychotropic substances
              </option>
              <option value="Negotiable Items or documents">
                Negotiable Items or documents
              </option>
              <option value="Negotiable Currency - Bullion, Money, Fake/Dummy/Collectable Cash, Payment Cards, Traveler Cheques, Passports, IDs, Stamps">
                Negotiable Currency - Bullion, Money, Fake/Dummy/Collectable
                Cash, Payment Cards, Traveler Cheques, Passports, IDs, Stamps
              </option>
              <option value="Oxidizing substances and organic peroxides Solids">
                Oxidizing substances and organic peroxides Solids
              </option>
              <option value="Plants and plant material including Seeds and Cut Flowers.">
                Plants and plant material including Seeds and Cut Flowers.
              </option>
              <option value="Pornographic material">
                Pornographic material
              </option>
              <option value="Precious, semi-precious metals or stones in any form including bricks">
                Precious, semi-precious metals or stones in any form including
                bricks
              </option>
              <option value="Radioactive material - Fissile material (Uranium 235, etc.), Radioactive waste material, Thorium or Uranium ores etc">
                Radioactive material - Fissile material (Uranium 235, etc.),
                Radioactive waste material, Thorium or Uranium ores etc
              </option>
              <option value="Sand/Soil and Ores">Sand/Soil and Ores</option>
              <option value="Sandalwood and its oils">
                Sandalwood and its oils
              </option>
              <option value="Sea shells, including polished sea shells and handicrafts">
                Sea shells, including polished sea shells and handicrafts
              </option>
              <option value="Special Chemicals, Organisms, Materials, Equipments & Technologies (SCOMET) items">
                Special Chemicals, Organisms, Materials, Equipments &
                Technologies (SCOMET) items
              </option>
              <option value="Sword">Sword</option>
              <option value="Toner (Photocopier)">Toner (Photocopier)</option>
              <option value="Toxic and infectious substances">
                Toxic and infectious substances
              </option>
              <option value="Wet Ice (Frozen Water)">
                Wet Ice (Frozen Water)
              </option>
              <option value="Wood and wood pulp/products">
                Wood and wood pulp/products
              </option>

              {/* Restricted Commodities permitted only with prior approval from the Customs clearance team */}
              <option value="Alcoholic beverages">Alcoholic beverages</option>
              <option value="Artificial Jewelry">Artificial Jewelry</option>
              <option value="Auto parts with fluids in them">
                Auto parts with fluids in them
              </option>
              <option value="Banderols/Tax stickers with a shipment value in excess of EUR 500,000">
                Banderols/Tax stickers with a shipment value in excess of EUR
                500,000
              </option>
              <option value="Cannabis for medicinal purposes from bona fide pharmaceutical manufacturers with appropriate licences">
                Cannabis for medicinal purposes from bona fide pharmaceutical
                manufacturers with appropriate licences
              </option>
              <option value="Carnets">Carnets</option>
              <option value="Cigarettes, cigars, tobacco products and electronic cigarettes with a shipment value in excess of EUR 500,000">
                Cigarettes, cigars, tobacco products and electronic cigarettes
                with a shipment value in excess of EUR 500,000
              </option>
              <option value="Commemorative coins and medals with an individual value or total shipment value of EUR 2,000 or more are restricted for carriage">
                Commemorative coins and medals with an individual value or total
                shipment value of EUR 2,000 or more are restricted for carriage
              </option>
              <option value="Food stuffs, Perishable Food articles and Beverages requiring refrigeration or other Environmental control">
                Food stuffs, Perishable Food articles and Beverages requiring
                refrigeration or other Environmental control
              </option>
              <option value="Lithium Batteries">Lithium Batteries</option>
              <option value="Loose Pearls">Loose Pearls</option>
              <option value="Maps and literature where Indian external boundaries have been shown incorrectly">
                Maps and literature where Indian external boundaries have been
                shown incorrectly
              </option>
              <option value="Other Regulated Material (ORM-D) Service">
                Other Regulated Material (ORM-D) Service
              </option>
              <option value="Passports (only with Govt approval)">
                Passports (only with Govt approval)
              </option>
              <option value="Seeds">Seeds</option>
              <option value="Shipments that requires special License or Permit for transportation">
                Shipments that requires special License or Permit for
                transportation
              </option>
              <option value="Televisions">Televisions</option>
              <option value="Time-sensitive or critical written materials or documents including bids and contract proposals">
                Time-sensitive or critical written materials or documents
                including bids and contract proposals
              </option>
              <option value="Tobacco">Tobacco</option>
              <option value="Used Merchandise">Used Merchandise</option>
              <option value="Watches">Watches</option>
              <option value="Works of art">Works of art</option>

              {/* NDPS prohibited drugs - Marketing Substance */}

              <option value="Acetrophine">Acetrophine</option>
              <option value="Alfentanil">Alfentanil</option>
              <option value="Allobarbital">Allobarbital</option>
              <option value="Alphacetylmethadol">Alphacetylmethadol</option>
              <option value="Alprazolam">Alprazolam</option>
              <option value="Amfepramone">Amfepramone</option>
              <option value="Amfetamine">Amfetamine</option>
              <option value="Amineptine">Amineptine</option>
              <option value="Amobarbital">Amobarbital</option>
              <option value="Amphetamine">Amphetamine</option>
              <option value="Anileridine">Anileridine</option>
              <option value="Benzylmorphine">Benzylmorphine</option>
              <option value="Beta-Hydroxy-3-methyl fentanyl">
                Beta-Hydroxy-3-methyl fentanyl
              </option>
              <option value="Betaprodine">Betaprodine</option>
              <option value="Bromazepam">Bromazepam</option>
              <option value="Brotizolam">Brotizolam</option>
              <option value="Buprenorphine">Buprenorphine</option>
              <option value="Camazepam">Camazepam</option>
              <option value="Chlordiazepoxide">Chlordiazepoxide</option>
              <option value="Clobazam">Clobazam</option>
              <option value="Clonazepam">Clonazepam</option>
              <option value="Clorazepate">Clorazepate</option>
              <option value="Clotiazepam">Clotiazepam</option>
              <option value="Codeine">Codeine</option>
              <option value="Codeinone">Codeinone</option>
              <option value="Codinovo">Codinovo</option>
              <option value="Delorazepam">Delorazepam</option>
              <option value="Delta-9-tetrahydro-cannabinl">
                Delta-9-tetrahydro-cannabinl
              </option>
              <option value="Dexamfetamine">Dexamfetamine</option>
              <option value="Dexamphetamine">Dexamphetamine</option>
              <option value="Dextropropoxyphene">Dextropropoxyphene</option>
              <option value="Diazepam">Diazepam</option>
              <option value="Dicodide">Dicodide</option>
              <option value="Diconone">Diconone</option>
              <option value="Diethylpropion">Diethylpropion</option>
              <option value="Difenoxin">Difenoxin</option>
              <option value="Dihydrocodeine">Dihydrocodeine</option>
              <option value="Dihydromorphine">Dihydromorphine</option>
              <option value="Dihydroxy">Dihydroxy</option>
              <option value="Dilaudide">Dilaudide</option>
              <option value="Dimorphid">Dimorphid</option>
              <option value="Dionine">Dionine</option>
              <option value="Diphenoxylate">Diphenoxylate</option>
              <option value="Diphenoxylic Acid">Diphenoxylic Acid</option>
              <option value="Dipipanone">Dipipanone</option>
              <option value="Dronabinol">Dronabinol</option>
              <option value="Estazolam">Estazolam</option>
              <option value="Ethyl Loflazepate">Ethyl Loflazepate</option>
              <option value="Ethylmorphine">Ethylmorphine</option>
              <option value="Fencamfamin">Fencamfamin</option>
              <option value="Fenethylline">Fenethylline</option>
              <option value="Fenetylline">Fenetylline</option>
              <option value="Fentanyl">Fentanyl</option>
              <option value="Flurazepam">Flurazepam</option>
              <option value="Fluruitrazepam">Fluruitrazepam</option>
              <option value="Glutethimide">Glutethimide</option>
              <option value="Hybernil">Hybernil</option>
              <option value="Hycodan">Hycodan</option>
              <option value="Hydrocodone">Hydrocodone</option>
              <option value="Hydromorphone">Hydromorphone</option>
              <option value="Ketamine">Ketamine</option>
              <option value="Ketazolam">Ketazolam</option>
              <option value="Levamfetamine">Levamfetamine</option>
              <option value="Levamfetamine">Levamfetamine</option>
              <option value="Loprazolam">Loprazolam</option>
              <option value="Lorazepam">Lorazepam</option>
              <option value="Lorazeram">Lorazeram</option>
              <option value="Lormetazepam">Lormetazepam</option>
              <option value="Lormetazepam">Lormetazepam</option>
              <option value="Mazindol">Mazindol</option>
              <option value="Medazepam">Medazepam</option>
              <option value="Meprobamate">Meprobamate</option>
              <option value="Mesocarb">Mesocarb</option>
              <option value="Metamfetamine">Metamfetamine</option>
              <option value="Metamfetamine">Metamfetamine</option>
              <option value="Methadone">Methadone</option>
              <option value="Methamphetamine">Methamphetamine</option>
              <option value="Methamphetamine">Methamphetamine</option>
              <option value="Methylphenidate">Methylphenidate</option>
              <option value="Midazolam">Midazolam</option>
              <option value="Morphine">Morphine</option>
              <option value="Multacodin">Multacodin</option>
              <option value="Nicomorphine">Nicomorphine</option>
              <option value="Nimetazepam">Nimetazepam</option>
              <option value="Nitrazepam">Nitrazepam</option>
              <option value="Nomocodeine">Nomocodeine</option>
              <option value="Novalaudon">Novalaudon</option>
              <option value="Nycodide">Nycodide</option>
              <option value="Oxazepam">Oxazepam</option>
              <option value="Oxycodone">Oxycodone</option>
              <option value="Oxymorphone">Oxymorphone</option>
              <option value="Paramorfan">Paramorfan</option>
              <option value="Pemoline">Pemoline</option>
              <option value="Pentazocine">Pentazocine</option>
              <option value="Pentobarbital">Pentobarbital</option>
              <option value="Pethidine">Pethidine</option>
              <option value="Phendimetrazine">Phendimetrazine</option>
              <option value="Phenmetrazine">Phenmetrazine</option>
              <option value="Phenobarbital">Phenobarbital</option>
              <option value="Phentermine">Phentermine</option>
              <option value="Phocodine">Phocodine</option>
              <option value="Prazepam">Prazepam</option>
              <option value="Propiram">Propiram</option>
              <option value="Racemate">Racemate</option>
              <option value="Remifentanil">Remifentanil</option>
              <option value="Secobarbital">Secobarbital</option>
              <option value="Sufentanil">Sufentanil</option>
              <option value="Tetrazepam">Tetrazepam</option>
              <option value="Tilidine">Tilidine</option>
              <option value="Tramadol">Tramadol</option>
              <option value="Triazolam">Triazolam</option>
              <option value="Zipeprol">Zipeprol</option>
              <option value="Zolpidem">Zolpidem</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="value-added-services" className="form-label">
              Value-added Services:
            </label>
            <Select
              id="value-added-services"
              options={valueAddedServicesOptions}
              isMulti
              value={selectedOptions}
              onChange={handleSelectChange}
              // required
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <button
              type="submit"
              className="btn btn-primary"
              style={{ height: "50px", width: "100px" }}
              disabled={disableSubmit}
            >
              Submit
            </button>

            <div style={{ marginLeft: "20px" }}></div>
          <button
            type="reset"
            className="btn btn-primary"
            style={{ height: "50px", width: "100px" }}
            onClick={handleRefresh}
          >
            Refresh
          </button>
          </div>
        </form>
      )}

      {submitted && (
        <div>
          {/* Total Chargable Weight And no of Pices*/}
          <div className="chargeable-weight">
            <p>Chargeable Weight: {chargeableWeight} kg</p>
            {chargeableWeight > 70 && (
              <p className="text-danger">
                Chargeable weight exceeds 70 kg. Please reduce weight.
              </p>
            )}
            <p>Total No. of pieces: {totalPackages}</p>
          </div>

          {/* Recalculate button */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <button
              type="button"
              className="btn btn-success"
              style={{ height: "50px", width: "100px", marginRight: "20px" }}
              onClick={handleConfirm}
            >
              Confirm
            </button>
 
            <button
              type="button"
              className="btn btn-yellow"
              style={{ height: "50px", width: "100px", marginRight: "20px", backgroundColor : "yellow" , borderColor: "yellow" }}
              onClick={handleDraft}
            >
              Draft
            </button>
 
            <button
              type="button"
              className="btn btn-danger"
              style={{ height: "50px", width: "100px" }}
              onClick={handleRecalculate}
            >
              Recalculate
            </button>
          </div>

          {/* Checkbox and Save Button */}
          {/* <div className="checkbox-save-container">
            <input type="checkbox" id="saveFormData" />
            <label htmlFor="saveFormData"></label>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSaveFormData}
            >
              Save
            </button>
          </div> */}

          <div class="disclaimer">
            <h2 class="heading">
              <strong>Disclaimer : </strong>
            </h2>
            <h6 class="subheading">
              Price Breakdown Show here will not be the final as some extra
              charges like Receipted and pickup charge will be extra.
            </h6>
          </div>

          {/* <div className="custom-container">
            <div className="custom-service-container">
              {services.map((service, index) => (
                <div className="custom-service" key={index}>
                  <h4>Total Price {service.serviceType}: {service.withgst || service.withgstfedex || service.withgstups}</h4>
                  <div className="custom-breakdown">
                    <h5>Price Breakdown:</h5>
                    <table className="custom-table">
                      <tbody>
                      {Object.entries(service).map(([key, value], idx) => (
                        labelMap[key] ? (  // Check if a label exists for this key
                          <tr key={idx}>
                            <td>{labelMap[key]}:</td>
                            <td>{value}</td>
                          </tr>
                        ) : null
                      ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </div> */}
          <div>
    {services.length > 0 ? (
      <div className="custom-container">
        <div className="custom-service-container">
          {services.map((service, index) => (
            <div className="custom-service" key={index}>
              <h4>Total Price {service.service.toUpperCase()}: {service.data.withgst || service.data.withgstfedex || service.data.withgstups}</h4>
              <div className="custom-breakdown">
                <h5>Price Breakdown:</h5>
                <table className="custom-table">
                  <tbody>
                    {Object.entries(service.data).map(([key, value], idx) => (
                      labelMap[key] && ( // Only display if the key is in the labelMap
                        <tr key={idx}>
                          <td>{handleDisplayLabel(key)}:</td>
                          <td>{value}</td>
                        </tr>
                      )
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
    ) : (
      <div>No data available.</div>
    )}
    {loading && <div>Loading...</div>}
    {error && <div>Error: {error.message}</div>}
  </div>
        </div>
      )}
    </div>
  );
};

export default ShippingForm;
