import MuiCheckbox from "@material-ui/core/Checkbox";
import * as React from "react";
import { FieldRenderProps } from "react-final-form";

interface IProps extends FieldRenderProps {}

const Checkbox: React.SFC<IProps> = ({ input: { checked, name, onChange, ...restInput }, meta, ...rest }) => {
    return <MuiCheckbox {...rest} name={name} inputProps={restInput} onChange={onChange} checked={checked} />;
};

export default Checkbox;