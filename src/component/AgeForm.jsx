import React from "react";

const AgeForm = ({ dateOfBirth, setDateOfBirth, setAge }) => {
  const [errors, setErrors] = React.useState({});

  function validateForm() {
    const date = new Date();
    let isValid = true;
    let newErrors = {};

    if (dateOfBirth.year == "") {
      isValid = false;
      newErrors.year = "This field is required";
    } else if (!/^\d+$/.test(dateOfBirth.year)) {
      isValid = false;
      newErrors.year = "Plese enter correct number";
    } else if (parseInt(dateOfBirth.year) > date.getFullYear()) {
      isValid = false;
      newErrors.year = "Must be in the past";
    }

    if (dateOfBirth.month == "") {
      isValid = false;
      newErrors.month = "This field is required";
    } else if (!/^\d+$/.test(dateOfBirth.month)) {
      isValid = false;
      newErrors.month = "Plese enter correct number";
    } else if (
      parseInt(dateOfBirth.month) < 1 ||
      parseInt(dateOfBirth.month) > 12
    ) {
      isValid = false;
      newErrors.month = "Must be a valid month";
    }

    if (dateOfBirth.day == "") {
      isValid = false;
      newErrors.day = "This field is required";
    } else if (!/^\d+$/.test(dateOfBirth.day)) {
      isValid = false;
      newErrors.day = "Plese enter correct number";
    } else if (
      parseInt(dateOfBirth.day) < 1 ||
      parseInt(dateOfBirth.day) > 31
    ) {
      isValid = false;
      newErrors.day = "Must be a valid day";
    }
    
    setErrors(newErrors);
    return isValid;
  }

  function generateResultAge() {
    const date = new Date();

    const year = parseInt(dateOfBirth.year);
    const month = parseInt(dateOfBirth.month);
    const day = parseInt(dateOfBirth.day);

    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth() + 1;
    const currentDay = date.getDate();

    let resultYear = currentYear - year;
    let resultMonth = currentMonth - month;
    let resultDay = currentDay - day;

    if (resultMonth < 0) {
      resultMonth += 12;
      resultYear--;
    }

    if (resultDay < 0) {
      const previousMonthDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        0
      );
      resultDay += previousMonthDate.getDate();
      resultMonth--;
    }

    setAge({
      year: resultYear,
      month: resultMonth,
      day: resultDay,
    });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setDateOfBirth((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (validateForm()) {
      setDateOfBirth(dateOfBirth);
      generateResultAge();
    }
  }

  const errorStyle = {
    color: "red",
    fontSize: "10px",
    lineHeight: "12px",
    fontWeight: "300",
    marginTop: "7px",
  };

  return (
    <div>
      <form className="age-form" onSubmit={handleSubmit}>
        <div className="input-container">
          <label
            htmlFor="day"
            style={{ color: errors.day ? "red" : "hsl(0, 1%, 44%)" }}
          >
            DAY
          </label>
          <input
            style={{ border: errors.day ? "1px solid red" : "" }}
            name="day"
            type="text"
            maxLength={2}
            placeholder="DD"
            value={dateOfBirth.day}
            onChange={handleChange}
          />
          {errors.day && <span style={errorStyle}>{errors.day}</span>}
        </div>
        <div className="input-container">
          <label
            htmlFor="month"
            style={{ color: errors.month ? "red" : "hsl(0, 1%, 44%)" }}
          >
            MONTH
          </label>
          <input
            style={{ border: errors.month ? "1px solid red" : "" }}
            name="month"
            type="text"
            maxLength={2}
            placeholder="MM"
            value={dateOfBirth.month}
            onChange={handleChange}
          />
          {errors.month && <span style={errorStyle}>{errors.month}</span>}
        </div>
        <div className="input-container">
          <label
            htmlFor="year"
            style={{ color: errors.year ? "red" : "hsl(0, 1%, 44%)" }}
          >
            YEAR
          </label>
          <input
            style={{ border: errors.year ? "1px solid red" : "" }}
            name="year"
            type="text"
            maxLength={4}
            placeholder="YYYY"
            value={dateOfBirth.year}
            onChange={handleChange}
          />
          {errors.year && <span style={errorStyle}>{errors.year}</span>}
        </div>
        <button>
          <img src="assets/images/icon-arrow.svg" alt="arrow button" />
        </button>
      </form>
    </div>
  );
};

export default AgeForm;
