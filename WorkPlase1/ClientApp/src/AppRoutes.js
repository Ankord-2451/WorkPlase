import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { Auth } from "./components/Authorization";
import { Regist } from "./components/Registration"; 
//import { Task } from "./components/TaskForm";
//import { Pr } from "./components/PrForm";
//import { TaskEdit } from "./components/TaskEdit";
//import { TaskShow } from "./components/TaskShow";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/fetch-data',
    element: <FetchData />
  },
  {
      path: '/Auth',
      element: <Auth />
  },
  {
      path: '/Regist',
      element: <Regist />
    },
    {
        path: '/TShow',
        //element: </>
        // element: <TaskShow id='9' />
    },
];

export default AppRoutes;
