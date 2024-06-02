import React from "react";
import "./Home.css";
import { CoinContext } from "../../context/CoinContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { allCoin, currency } = useContext(CoinContext);

  const [displayCoin, setDisplayCoin] = useState([]);

  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin]);

  const [input, setInput] = useState("");

  const InputHandler = (event) => {
    setInput(event.target.value);
  };

  const searchHandler = async (event) => {
    Event.preventDefault();
    const coins = await allCoin.filter((item) => {
      item.name.toLowerCase().include(input.toLowerCase())
             
    })
    setDisplayCoin(coins);
  }


  return (
    <div className="home">
      <div className="hero">
        <h1>
          Largest <br /> CryptoMarketplace
        </h1>
        <p>
          Welcome to the world's largest cryptocurrency marketplace. sign up to
          explore more about cryptos.
        </p>
        <form onSubmit={searchHandler}>
          <input
            onChange={InputHandler}
            list='coinlist'
            value={input}
            type="text"
            placeholder="search crypto.."
          required/>

         <detailist id='coinlist'>
          {allCoin.map((item,index)=>(<option key={index} vlaue={item.name}/>))}
         </detailist>


          <button type="submit">search</button>
        </form>
      </div>
      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{ textAlign: "center" }}>24H Change</p>
          <p className="market-cap">Market Cap</p>
        </div>
        {displayCoin.slice(0, 10).map((item, index) => (
          <Link to={ `/coin/${item.id}`}className="table-layout" key={index}>
            <p>{item.market_cap_rank}</p>
            <div>
              <img src={item.image} alt="" />
              <p>{item.name + " - " + item.symbol}</p>
            </div>
            <p>
              {currency.symbol} {item.current_price}
            </p>
            <p
              className={item.price_change_percentage_24H > 0 ? "green" : "red"}
            >
              {Math.floor(item.price_change_percentage_24H * 100) / 100}
            </p>
            <p className="market-cap">
              {currency.symbol}
              {item.market_cap.toLocaleString()}
            </p>
          </Link>
        ))}
      </div>
      
    </div>
  );
};

export default Home;
