import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { apiUser } from "../../services/user";
import { useState } from "react";
import { notificationFunction } from "../../components/notification/notification";
import { checkToken } from "../../util/auth";

export default function Register() {
  const [isLoading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const isToken = checkToken();
  const onSubmit = async (dataInput) => {
    try {
      setLoading(true);
      const { user } = await apiUser.register({ user: dataInput });
      setLoading(false);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    } catch (err) {
      setLoading(false);
      notificationFunction({ message: err, type: "error" });
    }
  };
  useEffect(() => {
    if (isToken) {
      navigate("/");
    }
  }, []);
  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign up</h1>
            <p className="text-xs-center">
              <Link href="">Have an account?</Link>
            </p>

            <ul className="error-messages">
              {errors.username && <li>{errors.username.message}</li>}
              {errors.email && <li>{errors.email.message}</li>}
              {errors.password && <li>{errors.password.message}</li>}
            </ul>

            <form onSubmit={handleSubmit(onSubmit)}>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                  {...register("username", {
                    required: {
                      value: true,
                      message: " This field is required",
                    },
                  })}
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                  {...register("email", {
                    required: {
                      value: true,
                      message: " This field is required",
                    },
                    pattern: {
                      value: /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/g,
                      message: "Error address email",
                    },
                  })}
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                    minLength: {
                      value: 6,
                      message: "Min length minimum 6",
                    },
                  })}
                />
              </fieldset>
              <button
                type="submit"
                className="btn btn-lg btn-primary pull-xs-right d-flex align-items-center"
              >
                {isLoading && (
                  <div className="spinner-border mr-2" role="status">
                    <span className="visually-hidden"></span>
                  </div>
                )}
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
