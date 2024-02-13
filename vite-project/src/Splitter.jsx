import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PersonIcon from "@mui/icons-material/Person";
import "./Splitter.css";

export default function Splitter() {
  const [formData, setFormData] = useState({
    bill: 0,
    tipPercent: [5, 10, 15, 25, 50],
    numOfPeople: "",
    tipValue: 0,
  });

  const [tipAmount, setTipAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  // const [activeButton, setActiveButton] = useState(null);
  const [isError, setIsError] = useState(false);

  const handleChange = (evt) => {
    const changeField = evt.target.name;
    const newValue = evt.target.value;

    setFormData((currData) => {
      return {
        ...currData,
        [changeField]: newValue,
      };
    });
  };

  // const handleClick = (evt) => {
  //   const changeField = evt.target.name;
  //   const newValue = evt.target.value;

  //   // setActiveButton(buttonIndex);

  //   setFormData((currData) => {
  //     return {
  //       ...currData,
  //       [changeField]: newValue,
  //     };
  //   });
  // };

  // const getButtonStyle = (buttonIndex) => {
  //   return {
  //     backgroundColor:
  //       activeButton === buttonIndex
  //         ? "hsl(172, 67%, 45%)"
  //         : "hsl(183, 100%, 15%)",
  //   };
  // };

  const reset = () => {
    setFormData({
      bill: "",
      tipPercent: [5, 10, 15, 25, 50],
      numOfPeople: "",
      tipValue: 0,
    });

    setTipAmount(0);
    setTotalAmount(0);
  };

  // rounding and setting the decimal places to 2
  function round(value, decimals) {
    return Number(Math.round(value + "e" + decimals) + "e-" + decimals).toFixed(
      decimals
    );
  }

  // const changeBackground = (e) => {
  //   // setBackgroundColor(!backgroundColor);
  //   e.target.style.background = "hsl(172, 67%, 45%)";
  // };

  // const changeBackground1 = (e) => {
  //   e.target.style.background = "hsl(183, 100%, 15%)";
  // };

 

  useEffect(() => {
    // Recalculate tipAmount when dependent values change
    let newTipAmount = round(formData.bill * (formData.tipValue / 100), 2);
    setTipAmount(newTipAmount);

    // Recalculate totalAmount when dependent values change
    let newTotalAmount =
      formData.numOfPeople > 0
        ? round(
            (parseFloat(formData.bill) + parseFloat(newTipAmount)) /
              formData.numOfPeople,
            2
          )
        : 0;
    setTotalAmount(newTotalAmount);
    
    // 
    // let newBillBool =
    formData.bill === 0 ? setIsError(true) : setIsError(false);
  }, [formData.bill, formData.tipValue, formData.numOfPeople]);

  // let customBorderColor = "hsl(183, 100%, 15%)";
  // const isError = formData.bill === 0;

  return (
    <>
      <h1 style={{ lineHeight: 1, letterSpacing: "10px", textAlign: "center" }}>
        SPLI
        <br />
        TTER
      </h1>
      {/* app container */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        margin="auto"
        marginTop={0}
        // padding="30px 0"
        backgroundColor="hsl(189, 41%, 97%)"
        // width={750}
        borderRadius={5}
      >
        {/* 2nd container */}
        <Box
          display="flex"
          // alignItems="center"
          // justifyContent="center"
          margin="1rem"
        >
          {/* left box container */}
          <Box display="flex" marginRight="8" padding="16" width={300}>
            <Stack spacing={3}>
              {/* bill input */}
              <label htmlFor="bill"></label>
              <TextField
                id="outlined-basic"
                label="Bill"
                variant="outlined"
                onChange={handleChange}
                value={formData.bill}
                // placeholder="0"
                name="bill"
                // color="green"
                // style={{ borderColor: customBorderColor }}
                // sx={{
                //   color: {customBorderColor}
                // }}
                error={isError}
                helperText={isError ? "Can't be zero" : ""}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AttachMoneyIcon />
                    </InputAdornment>
                  ),
                }}
              />
              {/* button group */}
              <Grid container spacing={2}>
                <Grid item xs={12} style={{ paddingLeft: 0, paddingTop: 0 }}>
                  {/* First ButtonGroup with the first three buttons */}
                  <ButtonGroup
                    fullWidth
                    variant="contained"
                    aria-label="tip buttons"
                  >
                    {formData.tipPercent.slice(0, 3).map((percent, index) => (
                      <>
                        <Button
                          key={index}
                          value={percent}
                          onClick={handleChange}
                          name="tipValue"
                          style={{
                            backgroundColor: "hsl(183, 100%, 15%)",

                            marginRight: index !== 2 ? "8px" : "0",
                          }}
                        >
                          {percent}%
                        </Button>
                      </>
                    ))}
                  </ButtonGroup>
                </Grid>
                <Grid item xs={12} style={{ paddingLeft: 0 }}>
                  {/* Second ButtonGroup with the last two buttons */}
                  <ButtonGroup
                    fullWidth
                    variant="contained"
                    aria-label="tip buttons"
                  >
                    {formData.tipPercent.slice(3).map((percent, index) => (
                      <>
                        <Button
                          key={index}
                          value={percent}
                          onClick={handleChange}
                          name="tipValue"
                          style={{
                            backgroundColor: "hsl(183, 100%, 15%)",
                            marginRight: index !== 1 ? "8px" : "0",
                          }}
                        >
                          {percent}%
                        </Button>
                      </>
                    ))}
                  </ButtonGroup>
                </Grid>
              </Grid>
              {/* number of people input */}
              <label htmlFor="Number of People"></label>
              <TextField
                id="outlined-basic"
                label="Number Of People"
                variant="outlined"
                placeholder="0"
                onChange={handleChange}
                value={formData.numOfPeople}
                name="numOfPeople"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
          </Box>
          {/* right box container */}
          <Box
            display="flex"
            flexDirection={"column"}
            marginLeft="20px"
            padding="0 20px"
            borderRadius="10px"
            backgroundColor="hsl(183, 100%, 15%)"
            position={"relative"}
            width={"300px"}
            boxSizing={"border-box"}
          >
            <p
              style={{
                color: "white",
                display: "inline-block",
                marginRight: "20px",
                marginBottom: "0",
              }}
            >
              Tip Amount
            </p>
            <p
              style={{
                color: "white",
                display: "inline",
                position: "absolute",
                right: "10px",
                fontSize: "32px",
              }}
            >
              ${tipAmount === 0 ? "0.00" : tipAmount}
            </p>
            <p
              style={{ color: "lightslategray", margin: "0", fontSize: "14px" }}
            >
              /person
            </p>

            <p
              style={{
                color: "white",
                display: "inline-block",
                marginRight: "20px",
                marginBottom: "0",
              }}
            >
              Total
            </p>
            <p
              style={{
                color: "white",
                display: "inline",
                position: "absolute",
                top: "50px",
                right: "10px",
                fontSize: "32px",
              }}
            >
              ${totalAmount === 0 ? "0.00" : totalAmount}
            </p>
            <p
              style={{ color: "lightslategray", margin: "0", fontSize: "14px" }}
            >
              /person
            </p>

            <Button
              variant="outlined"
              onClick={reset}
              style={{
                color: "white",
                backgroundColor: "hsl(172, 67%, 45%)",
                position: "absolute",
                bottom: "10px",
                width: "85%",
              }}
            >
              RESET
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
