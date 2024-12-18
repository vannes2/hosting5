import React from "react";

const electronic = () => {
  return (
    <div className="payment-options">
      <div id="electronic">
        <div className="option-1">
          <div className="option">
            <img src="assets/images/gopay.png" alt="Gopay" />
            <p>Gopay</p>
            <input type="radio" name="payment-method" value="electronic" />
          </div>
        </div>
        <div className="option-4">
          <div className="option">
            <img src="assets/images/spay.png" alt="ShopeePay" />
            <p>ShopeePay</p>
            <input type="radio" name="payment-method" value="electronic" />
          </div>
        </div>
        <div className="option-2">
          <div className="option">
            <img src="assets/images/ovo.png" alt="OVO" />
            <p>OVO</p>
            <input type="radio" name="payment-method" value="electronic" />
          </div>
        </div>
        <div className="option-3">
          <div className="option">
            <img src="assets/images/dana.svg" alt="Dana" />
            <p>Dana</p>
            <input type="radio" name="payment-method" value="electronic" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default electronic;
