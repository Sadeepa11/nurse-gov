"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Tilt from "react-parallax-tilt";

// ✅ Import CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "./css/util.css";
import "./css/main.css";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Email:", email, "Password:", password);
        // TODO: Add API call to backend
    };

    return (
        <div className="limiter">
            <div className="container-login100">
                <div className="wrap-login100">
                    {/* Logo with Tilt Effect */}
                    <Tilt glareEnable={true} glareMaxOpacity={0.2} scale={1.05}>
                        <div className="login100-pic">
                            <Image
                                src="/login/images/Logo_login.png"
                                alt="Logo"
                                width={300}
                                height={300}
                                priority
                            />
                        </div>
                    </Tilt>

                    {/* Login Form */}
                    <form className="login100-form validate-form" onSubmit={handleSubmit}>
                        <span className="login100-form-title">Member Login</span>

                        {/* Email */}
                        <div className="mb-3">
                            <div className="input-group">
                                <span className="input-group-text bg-white">
                                    <i className="fa fa-envelope"></i>
                                </span>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter your Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="mb-3">
                            <div className="input-group">
                                <span className="input-group-text bg-white">
                                    <i className="fa fa-lock"></i>
                                </span>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter your Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>


                        {/* Submit Button */}
                        <div className="container-login100-form-btn">
                            <button type="submit" className="login100-form-btn">
                                Login
                            </button>
                        </div>

                        {/* Forgot Password */}
                        <div className="text-center p-t-12">
                            <span className="txt1">Forgot</span>
                            <Link className="txt2" href="#">
                                Username / Password?
                            </Link>
                        </div>

                        {/* Create Account */}
                        <div className="text-center p-t-136">
                            <Link className="txt2" href="#">
                                Create your Account{" "}
                                <i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
