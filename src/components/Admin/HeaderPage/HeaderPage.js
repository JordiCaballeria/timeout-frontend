import React from "react";
import "./HeaderPage.scss";
import { Button, Dropdown } from "semantic-ui-react";

export const HeaderPage = (props) => {
  const { title, btnTitle, btnClick,
    btnTitle2, btnClick2,
    slcOptions, slcChange, slcOptionsText,
    slcOptions2, slcChange2, slcOptionsText2 } = props;
  return (
    <div className="header-page-admin">
      <h2>{title}</h2>
      <div>
        {btnTitle && (
          <Button
            positive
            icon='plus'
            content={btnTitle}
            onClick={btnClick}
          />
        )}
        {btnTitle2 && (
          <Button
            color="blue"
            icon='paper plane'
            content={btnTitle2}
            onClick={btnClick2}
          />
        )}
        {slcOptions && (<Dropdown
          placeholder={slcOptionsText}
          multiple
          selection
          options={slcOptions}
          onChange={slcChange}
        />
        )}
        {slcOptions2 && (<Dropdown
          placeholder={slcOptionsText2}
          multiple
          selection
          options={slcOptions2}
          onChange={slcChange2}
        />
        )}
      </div>
    </div>
  );
};
