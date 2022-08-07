import { Box } from "@mui/material";
import "./Landing.scss";
// import LPBox from "../../components/LPBox/LPBox";
import { useState, useEffect } from "react";
import { useAddress } from "../../hooks";
import ERC20ABI from "../../abis/ERC20ABI.json";
import { ethers } from "ethers";
import { useWeb3Context } from "../../hooks";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button } from "@mui/material"
import _ from "lodash";
import { addresses } from "../../constants";
import TextField from '@mui/material/TextField';
import { numberWithCommas, converNumber2Str } from "../../utils"

let timerid = null;
function Landing() {
  const account = useAddress();
  const { chainID, provider, address } = useWeb3Context();
  const [selToken, setToken] = useState(0);
  const [tokenList, setTokenList] = useState([]);
  const [amount, setAmount] = useState(0)
  const [addressTo, setAddressTo] = useState("")
  const [balance, setBalance] = useState("-- --")
  const [decimal, setDecimal] = useState()

  useEffect(() => {
    if (!chainID || chainID === 1) return;
    console.log(chainID, addresses);
    const tokens = _.get(addresses, chainID, "");
    console.log(_.keys(tokens)[0]);
    setToken(_.keys(tokens)[0]);
    setTokenList(_.keys(tokens));
  }, [provider]);

  useEffect(()=>{
    loadUserBalance()
  }, [selToken])

    const loadUserBalance = async() => {
        if(!address) return;
        const addr = _.get(addresses, [chainID, tokenList[selToken]], "")
        if(addr === "") return;
        const tokenContract = new ethers.Contract(addr, ERC20ABI, provider);
        const deci = await tokenContract.decimals();
        const bala = await tokenContract.balanceOf(address) / 10 ** deci;
        setDecimal(deci)
        console.log(deci)
        setBalance(bala)
    }

  const handleChange = (event) => {
    setToken(Number(event.target.value));
    setAmount(0)
  };

  const handleAmount = (e) => {
    if(isNaN(e.target.value)) return;
    setAmount(Number(e.target.value))
  }

  const doTransfer = async() => {
    if(!addressTo) return;
    if(balance < amount) {
        alert("insufficient balance");
        return;
    }
    const addr = _.get(addresses, [chainID, tokenList[selToken]], "")
    if(addr === "") return;
    const signer = provider.getSigner();
    const tokenContract = new ethers.Contract(addr, ERC20ABI, signer);
    const tx = await tokenContract.transfer(addressTo, converNumber2Str(amount, decimal))
    await tx.wait();
    console.log(tx)
    loadUserBalance();
  }
  return (
    <div id="landing-view">
      <Box fontWeight="300" fontSize="36px" mt="20px" mb="50px">
        Transfer Tokens
      </Box>
      <Box
        p="20px"
        borderRadius="5px"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Box display='flex' position="relative" mb="20px" width="500px">
            <Box width="100%" my="20px" fontSize="12px" fontWeight="200" textAlign="right" position="absolute" left="0" top="-100%">User Balance {numberWithCommas(balance)}</Box>
            <FormControl style={{ width: "200px", marginRight: '20px' }} fullWidth>
                <InputLabel id="demo-simple-select-label">Token</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selToken}
                label="Token"
                onChange={handleChange}
                >
                {_.map(tokenList, (each, index) => {
                    return <MenuItem value={index} key={index}>{each}</MenuItem>;
                })}
                </Select>
            </FormControl>
            <TextField fullWidth id="outlined-basic" label="Amount" variant="outlined" value={amount} onChange={handleAmount} />
        </Box>
        <Box width="500px" mb="20px">
            <TextField fullWidth id="outlined-basic" label="Send To" variant="outlined" value={addressTo} onChange={(e)=>{setAddressTo(e.target.value)}} />
        </Box>
        <Box><Button variant="outlined" color="secondary" onClick={doTransfer}>Transfer</Button></Box>
      </Box>
    </div>
  );
}

export default Landing;
