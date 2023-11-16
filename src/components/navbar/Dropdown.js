const Dropdown = () => {
    return ( 
        <div className="d-flex flex-row">

          <div className="text">
            <h3>Year:</h3>
          </div>

          <div>
              <select name="selectedYear" id="selectedYear" className="form-select">
                <option selected>None</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
              </select>
          </div>
          
          <div className="text">
            <h3>Month:</h3>
          </div>

          <div>
            <select name="selectedMonth" id="selectedMonth" className="text-center form-select">
                <option selected value="None">None</option>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
              </select>
          </div>

        </div>
     );
}
 
export default Dropdown;