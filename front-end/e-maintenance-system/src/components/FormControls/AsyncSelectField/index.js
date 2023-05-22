import React from "react";
import Select from "react-select";
import Creatable from "react-select/creatable";

import FormField from "../FormField";

const chooseVariant = (variant) => {
  if (variant === "creatable") return Creatable;
  return Select;
};
function AsyncSelectComponent(props) {
  const {
    input,
    input: { value },
    loading,
    loadOptions,
    placeholder,
    multi,
    onchange,
    options,
    variant,
    disabled,
  } = props;
  function onChange(selection) {
    input.onChange(selection);

    if (onchange) {
      onchange(selection);
    }
  }

  const Component = chooseVariant(variant);
  return (
    <FormField {...props}>
      <div data-test-id={`${props.input.name}-select`}>
        <Component
          classNamePrefix={props.input.name}
          placeholder={placeholder}
          loadOptions={loadOptions}
          options={options}
          isMulti={multi}
          isLoading={loading}
          value={value}
          onChange={onChange}
          inputId={props.input.name}
          menuPortalTarget={document.body}
          menuPlacement={props.menuPlacement}
          styles={{
            menuPortal: (styles) => ({ ...styles, zIndex: 99999 }),
          }}
          isDisabled={disabled}
        />
      </div>
    </FormField>
  );
}

export default AsyncSelectComponent;
