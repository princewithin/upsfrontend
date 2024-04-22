import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function ManageWorkspace({ onWorkspaceNameChange }) {
  const [formVisible, setFormVisible] = useState(false);
  const [workspaceName, setWorkspaceName] = useState("Orange Star");
  const [newWorkspaceName, setNewWorkspaceName] = useState("");
  const [inviteFormVisible, setInviteFormVisible] = useState(false);
  const inviteRef = useRef(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [submitted, setSubmitted] = useState(false); // Track form submission
  const [status, setStatus] = useState(""); // Track status
  const [users, setUsers] = useState([]); // Array to store users data

  useEffect(() => {
    const fetchWorkspaceName = async () => {
      try {
        const response = await fetch("your_api_endpoint_here");
        const data = await response.json();
        setWorkspaceName(data.name);
      } catch (error) {
        console.error("Error fetching workspace name:", error);
      }
    };

    fetchWorkspaceName();
  }, []);

  useEffect(() => {
    // Fetch users data from API
    const fetchUsers = async () => {
      try {
        const response = await axios.get("your_api_endpoint_here");
        setUsers(response.data); // Update users state with data from API
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    // Add event listener to handle clicks outside the invite form
    function handleClickOutside(event) {
      if (inviteRef.current && !inviteRef.current.contains(event.target)) {
        setInviteFormVisible(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleEditClick = () => {
    setNewWorkspaceName(workspaceName);
    setFormVisible(true);
    setInviteFormVisible(false);
  };

  const handleSaveClick = async () => {
    try {
      const response = await fetch("your_api_endpoint_here", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newWorkspaceName }),
      });
      if (response.ok) {
        setWorkspaceName(newWorkspaceName);
        setFormVisible(false);
        onWorkspaceNameChange(newWorkspaceName);
      } else {
        console.error("Failed to update workspace name");
      }
    } catch (error) {
      console.error("Error updating workspace name:", error);
    }
  };

  const handleInviteClick = () => {
    setInviteFormVisible(!inviteFormVisible);
    setFormVisible(false);
  };

  const handleInputChange = (event) => {
    setNewWorkspaceName(event.target.value);
  };

  const handleNameChange = (e) => {
    let input = e.target.value;
    input = input.replace(/[^a-zA-Z\s]/g, "");
    input = input.toUpperCase();
    setName(input);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("api", { name, email, role })
      .then((result) => {
        console.log(result);
        setStatus("Invited");
        setSubmitted(true); // Set submitted to true after successful form submission
        // Hide the invite form
        setInviteFormVisible(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  
  //   axios
  //     .post("api", { name, email, role })
  //     .then((result) => {
  //       console.log(result);
  //       // Assuming result from API contains information about whether the invitation was accepted or not
  //       const { accepted } = result.data;
  
  //       if (accepted) {
  //         setStatus("Accepted");
  //       } else {
  //         setStatus("Pending");
  //       }
  //       setSubmitted(true); // Set submitted to true after successful form submission
  //       // Hide the invite form
  //       setInviteFormVisible(false);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // };
  

  const handleFormClick = (e) => {
    // Prevent hiding the form when clicking inside it
    e.stopPropagation();
  };

  // Function to handle delete button click
  function handleDelete(email) {
    fetch("/api/delete-invitation", {
      method: "DELETE",
      body: JSON.stringify({ email: email }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          // Update status to reflect deletion
          updateStatus(email, "Deleted");
        } else {
          console.error("Failed to delete invitation");
        }
      })
      .catch((error) => console.error("Error:", error));
  }

  // Function to handle re-send button click
  function handleResend(email) {
    fetch("/api/resend-invitation", {
      method: "POST",
      body: JSON.stringify({ email: email }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          // Update status to reflect re-sending
          updateStatus(email, "Invited");
        } else {
          console.error("Failed to resend invitation");
        }
      })
      .catch((error) => console.error("Error:", error));
  }

  // Function to update status in table
  function updateStatus(email, status) {
    // Find the row with the corresponding email and update status
    // This can be done by traversing the DOM or using a library like jQuery
  }

  // Event listeners for buttons
  document.querySelectorAll(".btn-delete").forEach((button) => {
    button.addEventListener("click", () => {
      const email = button
        .closest("tr")
        .querySelector("td:nth-child(2)").textContent;
      handleDelete(email);
    });
  });

  document.querySelectorAll(".btn-resend").forEach((button) => {
    button.addEventListener("click", () => {
      const email = button
        .closest("tr")
        .querySelector("td:nth-child(2)").textContent;
      handleResend(email);
    });
  });

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100 position-relative">
      <div
        className="position-absolute"
        style={{ top: "100px", left: "100px", transform: "translateX(-50%)" }}
      >
        <div
          className="d-flex align-items-center mb-3"
          style={{ transform: "translateX(20%)" }}
        >
          <h1 className="m-0" style={{ color: "white" }}>
            {formVisible ? (
              <input
                type="text"
                value={newWorkspaceName}
                onChange={handleInputChange}
                className="form-control"
              />
            ) : (
              <span>{workspaceName}</span>
            )}
          </h1>
          {/* <button
            className="btn btn-sm btn-primary ms-2"
            onClick={handleEditClick}
          >
            <i className="bi bi-pencil-fill"></i>
          </button> */}
        </div>
        {/* {formVisible && (
          <button
            className="btn btn-sm btn-primary"
            onClick={handleSaveClick}
            style={{ transform: "translateX(90%)" }}
          >
            Save
          </button>
        )} */}
      </div>

      <div
        className="dropdown position-absolute"
        style={{ top: "100px", left: "calc(100% - 120px)" }}
      >
        <button
          ref={inviteRef}
          className="btn btn-sm btn-success dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          onClick={handleInviteClick}
        >
          Invite
        </button>
        {inviteFormVisible && (
          <div
            className="dropdown-menu show invite-form-container"
            aria-labelledby="dropdownMenuButton"
            style={{ left: "auto", right: 0 }}
            onClick={handleFormClick}
          >
            <div className="form-container p-3" style={{ width: "350px" }}>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    <strong>Name</strong>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Name"
                    className="form-control rounded-0"
                    name="name"
                    onChange={handleNameChange}
                    value={name}
                    autoComplete="off"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    <strong>Email</strong>
                  </label>
                  <input
                    type="email"
                    placeholder="Enter Email"
                    className="form-control rounded-0"
                    name="email"
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="role" className="form-label">
                    <strong>Role</strong>
                  </label>
                  <select
                    className="form-select rounded-0"
                    onChange={handleRoleChange}
                    autoComplete="off"
                    required
                  >
                    <option value="admin">Admin</option>
                    <option value="sales">Sales</option>
                    <option value="agent">Agent</option>
                    <option value="others">Others</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="btn btn-success w-100 rounded-0 "
                >
                  Invite
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      <style>
        {`
          @media (max-width: 768px) {
           .position-absolute {
             left: 10px;
           }
           .btn-success {
             margin-left: 55px !important; /* Add !important to override inline styles */
           }   
           .form-container {
             width: 100% !important;
           }       
         }
         `}
      </style>

      <div class="mt-5 table-responsive" style={{ paddingBottom: "350px" }}>
        <h2 style={{ color: "white" }}>Users</h2>
        <table class="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{submitted ? status : ""}</td>
                <td>
                  <button class="btn btn-sm btn-primary me-2 btn-resend">
                    Re-send
                  </button>
                  <button class="btn btn-sm btn-danger btn-delete">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageWorkspace;
