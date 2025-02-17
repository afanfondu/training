import { useState } from "react";

type Gender = "male" | "female";

enum Skill {
  React = "react",
  Vue = "vue",
  Angular = "angular",
}

interface IFormData {
  firstName: string;
  lastName: string;
  age: number | "";
  gender: Gender;
  skill: Skill | "";
  email: string;
  phone: number | "";
  address: string;
}

const initialState: IFormData = {
  firstName: "",
  lastName: "",
  age: "",
  gender: "male",
  skill: "",
  email: "",
  phone: "",
  address: "",
};

const Form = () => {
  const [formData, setFormData] = useState<IFormData>(initialState);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedData = Object.entries(formData)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");

    alert("Form Data:\n\n" + formattedData);
    setFormData(initialState);
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            className="form-control"
            required
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            className="form-control"
            required
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="age" className="form-label">
            Age
          </label>
          <input
            id="age"
            type="number"
            className="form-control"
            required
            value={formData.age}
            onChange={(e) => {
              setFormData({
                ...formData,
                age: e.target.value ? parseInt(e.target.value) : "",
              });
            }}
          />
        </div>
        <div className="mb-3">
          <label className="form-label d-block">Gender</label>
          <div className="form-check form-check-inline">
            <input
              type="radio"
              id="male"
              value="male"
              className="form-check-input"
              required
              checked={formData.gender === "male"}
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value as Gender })
              }
            />
            <label htmlFor="male" className="form-check-label">
              Male
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              type="radio"
              id="female"
              value="female"
              className="form-check-input"
              checked={formData.gender === "female"}
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value as Gender })
              }
            />
            <label htmlFor="female" className="form-check-label">
              Female
            </label>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="skill" className="form-label">
            Skill
          </label>
          <select
            id="skill"
            name="skill"
            className="form-select"
            value={formData.skill}
            onChange={(e) =>
              setFormData({ ...formData, skill: e.target.value as Skill })
            }
            required
          >
            <option value="">Select Skill</option>
            {Object.entries(Skill).map(([key, value]) => (
              <option key={key} value={value}>
                {key}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone Number
          </label>
          <input
            type="number"
            id="phone"
            className="form-control"
            value={formData.phone}
            onChange={(e) =>
              setFormData({
                ...formData,
                phone: e.target.value ? parseInt(e.target.value) : "",
              })
            }
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <textarea
            id="address"
            className="form-control"
            rows={3}
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
