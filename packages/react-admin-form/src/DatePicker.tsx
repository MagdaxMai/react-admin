import { InputBaseProps } from "@material-ui/core/InputBase";
import { LocaleContext } from "@vivid-planet/react-admin-date-fns";
import { format, isValid, parse, parseISO } from "date-fns";
import * as React from "react";
import DatePickerOrig, { ReactDatePickerProps } from "react-datepicker";
// tslint:disable-next-line:no-submodule-imports
import "react-datepicker/dist/react-datepicker.css";
import { FieldRenderProps } from "react-final-form";
import * as sc from "./DatePicker.sc";
import { StyledInput } from "./Input";

const onChangeAdapter = (origOnChange: <T>(event: React.ChangeEvent<T> | any) => void, valueFormat: string, date?: Date) => {
    origOnChange(date && format(date, valueFormat));
};

interface IProps extends FieldRenderProps<string | Date, HTMLInputElement>, ReactDatePickerProps {
    width?: string;
}

class DPInput extends React.Component<InputBaseProps> {
    public render() {
        return <StyledInput type="text" {...this.props} />;
    }
}

export const DatePicker: React.FunctionComponent<IProps> = ({ input: { value, onChange, ...restInput }, meta, width, ...rest }) => {
    const locale = React.useContext(LocaleContext);
    const inputProps = {
        style: {
            width,
        },
    };
    const valueFormat = rest.showTimeSelect ? "yyyy-MM-dd HH:mm:ss" : "yyyy-MM-dd";

    let parsedValue: Date | null = null;
    if (value instanceof Date) {
        parsedValue = value;
    } else if (typeof value === "string") {
        parsedValue = parseISO(value);
        if (!isValid(parsedValue)) {
            parsedValue = parse(value, valueFormat, new Date());
        }
        if (!isValid(parsedValue)) {
            parsedValue = null;
        }
    }
    return (
        <sc.DatePickerRoot>
            <DatePickerOrig
                locale={locale}
                selected={parsedValue}
                onChange={onChangeAdapter.bind(this, onChange, valueFormat)}
                customInput={<DPInput {...inputProps} />}
                {...restInput}
                {...rest}
            />
        </sc.DatePickerRoot>
    );
};
