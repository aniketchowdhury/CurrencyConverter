import './App.css';
import {Typography, Select, TextField, makeStyles,FormControl,MenuItem, Button} from "@material-ui/core";
import {useState} from "react";
import {data} from "./mainData/data";
import _ from "underscore";
import { currencyConversion, calculator } from './currencyConversion';

const useStyles = makeStyles(theme=>({
  formControl: {
    margin: theme.spacing(1),
    top:"50px",
    display:"flex",
    flexDirection:"row",
    minWidth:"fit-content"
  },
  secondForm:{
    marginBottom:"76px"
  },
  row:{
    display:"flex",
    flexDirection:"row"
  },
  resultRow:{
      display:"flex",
      flexDirection:"row",
      marginTop:"50px"
  },
  fields:{
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
}))

function App() {
  const classes=useStyles();
  const [money1, setMoney1] = useState();
  const [currency1, setCurrency1] = useState("");
  const [currency2, setCurrency2] = useState("");
  const [result, setResult] = useState();
  let crossValue,resultNow;
  const handleChangeMoneyValue1=(event)=>{
    let regex = /[0-9]|\./;
    if(regex.test(event.target.value))
    setMoney1(event.target.value)
  }
  const handleChange1=(event)=>{
    setCurrency1(event.target.value);
  }

  const handleChange2=(event)=>{
    setCurrency2(event.target.value);
  }

  const convertButtonClick = () =>{
    crossValue=(currencyConversion(currency1,currency2,[]));
    resultNow = calculator(money1,crossValue);
    resultNow = (_.isEqual(currency2,"JPY"))?Math.floor(resultNow):resultNow.toFixed(2);
    setResult(resultNow);
  }

  return (
    <div className="App">
      <header className="App-header">
        <Typography variant="h4">Currency Converter</Typography>
      </header>
      <div className={classes.fields}>
        <FormControl variant="outlined" className={classes.formControl}>
        <TextField
        variant="outlined"
        value={money1}
        onChange={handleChangeMoneyValue1}
        />
          <Select
            value={currency1}
            onChange={handleChange1}
          >
            {data.map(key=>
        <MenuItem value={key.currency}>{key.currency}</MenuItem>
      )}
          </Select>
        </FormControl>
        <FormControl variant="outlined" className={`${classes.formControl} ${classes.secondForm}`}>
        <TextField
        variant="outlined"
        value={result}
        InputProps={{
          readOnly: true,
        }}
        />
          <Select
            value={currency2}
            onChange={handleChange2}
          >
            {data.map(key=>
        <MenuItem value={key.currency}>{key.currency}</MenuItem>
      )}
          </Select>
        </FormControl>
      <Button variant="contained" 
      color="primary" 
      style={{width:"284px"}}
      onClick={convertButtonClick}
      disabled={_.isEmpty(money1)||_.isEmpty(currency2)||_.isEmpty(currency1)}
      >Convert
      </Button>
      </div>
    </div>
  );
}

export default App;
