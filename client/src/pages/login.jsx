import React, { useContext } from "react";
import ChefHat from "../assets/chef-hat.png";
import { LockIcon, UserIcon } from "../reusables/svgs/svgs";
import Input from "../reusables/forms/input";
import { AuthContext, StatusModalContext } from "../components/App/App";
import useAxios from "../hooks/useAxios";
import { useNavigate } from "react-router-dom";
import { channels } from "../shared/constants";

export const Login = () => {
  const ipcRenderer = window?.ipcRenderer;
  const { postData } = useAxios();
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const { setStatusData } = useContext(StatusModalContext);

  const callback = (res) => {
    let auth = {
      id: 1,
      user: "Admin",
      token: "sfsfnsowwewe23ewdsffsferjfueigeefsfs32324212i1on",
    };
    setAuth(auth);
    sessionStorage.setItem("auth", JSON.stringify(auth));
    ipcRenderer && ipcRenderer.send(channels.LOGIN, { product: "notebook" });

    navigate("/dashboard");
  };

  const [credentials, setCredentials] = React.useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = "/authenticate";
    postData(url, credentials, setStatusData, callback);
  };

  return (
    <div className="min-h-screen bg-[#282c34] px-4">
      <section className="logo-section flex flex-col items-center justify-center gap-4 pt-12">
        <img
          src={ChefHat}
          alt="chef hat"
          width={62}
          className="bg-[#D9D9D9] p-2 rounded-full"
        />
        <h1 className="text-2xl font-bold text-[#61dafb]">
          Mustafah's Restaurant
        </h1>
        <h2 className="text-xl font-semibold text-white">Login</h2>
      </section>
      <section className="login-section flex justify-center">
        <form
          className="login-form w-[400px] flex flex-col items-center"
          onSubmit={handleSubmit}
        >
          <div className="form-group flex flex-col items-start gap-1 mt-2 w-full">
            <label htmlFor="username" className="text-white">
              Username
            </label>
            <Input
              type={"text"}
              name={"username"}
              value={credentials.username}
              onchange={handleChange}
              placeholder={"username"}
            >
              <UserIcon className={"w-6 h-6"} />
            </Input>
          </div>
          <div className="form-group flex flex-col items-start gap-1 mt-2 w-full">
            <label htmlFor="password" className="text-white">
              Password
            </label>
            <Input
              type={"password"}
              name={"password"}
              value={credentials.password}
              onchange={handleChange}
              placeholder={"password"}
            >
              <LockIcon className={"w-6 h-6"} />
            </Input>
          </div>
          <div className="flex justify-end w-full">
            <button
              type="submit"
              className="outline outline-2 outline-[#61dafb] bg-[#61dafb] w-full text-[#282c34] outline-offset-2 mt-8 text-xl py-0.5 px-5 rounded-[10px]"
            >
              Login
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};
