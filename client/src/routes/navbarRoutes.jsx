import { Route } from "react-router-dom";
import Auth from "../pages/auth";
import Statistic from "../pages/statistic";
import Main from "../pages/main";
import Gratz from "../pages/gratz";
import DelGratz from "../pages/delGratz";
import GetTesla from "../pages/getTesla";

const NavbarRouter = () => {
  return (
    <>
      <Route path="/getTesla/get" exact component={GetTesla} />
      <Route path="/delGratz/:params" exact component={DelGratz} />
      <Route path="/auth/:params" exact component={Auth} />
      <Route path="/statistic/:params" exact component={Statistic} />
      <Route path="/gratz/:params" component={Gratz} />
      <Route path="/:params?" exact component={Main} />
    </>
  );
};

export default NavbarRouter;
