import React from "react";
import { Toaster } from "react-hot-toast";

export default function Toast() {
  return (
    <div>
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toasterId="default"
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          removeDelay: 1000,
          style: {
            background: "#047857",
            color: "#fff",
          },

          // Default options for specific types
          success: {
            duration: 3000,
            iconTheme: {
              primary: "white",
              secondary: "black",
            },
          },
        }}
      />
    </div>
  );
}
