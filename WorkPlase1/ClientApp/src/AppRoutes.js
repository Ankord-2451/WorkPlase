import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { Auth } from "./components/Authorization";
import { Regist } from "./components/Registration"; 
//import { Task } from "./components/TaskForm";
//import { Pr } from "./components/PrForm";
//import { TaskEdit } from "./components/TaskEdit";
//import { TaskShow } from "./components/TaskShow";
//import { Worker } from "./components/worker";
import { ProjectShow } from "./components/ProjectShow";

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
        path: '/PrShow',
        element: <ProjectShow/>
    },
    {
        // path: '/TShow',
        //element: <TaskShow id='9' /> path: '/Regist/:id',
    },
];

export default AppRoutes;
