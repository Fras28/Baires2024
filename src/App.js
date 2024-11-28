import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import { MyFoot } from "./Components/myFoot/MyFooter.jsx";
import { Inicio } from "./Components/LandingStart/LandingStart.jsx";
import LandingPage from "./Components/Landing/LandingPage.jsx";
import { BagXX } from "./Components/myBag/myBag.jsx";
import { asyncComercio, asyncUser } from "./Components/redux/slice.jsx";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { CompSubCat } from "./Components/Categorias/CompSubCat.jsx";
import { AdminPanel } from "./Components/Comander/AdminPanel.jsx";

function App() {
 const dispatch = useDispatch();
 const { categorias, comercio } = useSelector((state) => state.alldata);
 const [isEffectExecuted, setIsEffectExecuted] = useState(false);

 useEffect(() => {
   if (!isEffectExecuted) {
     dispatch(asyncComercio());
     dispatch(asyncUser());
     setIsEffectExecuted(true);
   }
 }, [isEffectExecuted, dispatch]);

 return (
<div className="App" style={{ 
  backgroundImage: `url(${comercio?.attributes?.fondo?.data?.attributes?.url})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  minHeight: '100vh',
  width: '100%'
}}>
     <ToastContainer style={{zIndex:99999999}}/>
     <Switch>
       <Route exact path="/Comander" component={AdminPanel} />
       <Route exact path="/:id?" component={Inicio} />
       <Route exact path="/:id/Landing" component={LandingPage} />
       {categorias.map((cat) => (
         <Route
           exact
           path={`/:id/Landing/${cat?.attributes?.name}`}
           key={cat.id}
           render={(props) => <CompSubCat idCat={cat.id} {...props} />}
         />
       ))}
       <Route exact path="/:id/Landing/Comander" component={AdminPanel} />
       <Route exact path="/:id/bag" component={BagXX} />
     </Switch>
     <MyFoot />
   </div>
 );
}

export default App;