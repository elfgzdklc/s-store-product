import React, {useState} from 'react';
import {Controller, useForm} from "react-hook-form";
import {Checkbox, CheckboxGroup} from "rsuite";

interface SidebarProps {
    categories?: string[];
    onCategoryChange: (category: string) => void;
    selectedDefaultValue: string[];
}

const Sidebar: React.FC<SidebarProps> = ({categories, onCategoryChange, selectedDefaultValue}) => {
    const {handleSubmit, setValue, getValues, control, watch, reset, formState: {errors}} = useForm();
    const [selectC, setSelectC] = useState(selectedDefaultValue);

    return (
        <div>
            <h6 className="font-bold mb-4">Kategoriler</h6>
            <Controller name="categories" control={control}
                        render={({field: {onChange, name, value}}) => (
                            <div className="flex items-center">
                                <CheckboxGroup
                                    name={name}
                                    value={selectC}
                                    onChange={(e: any) => {
                                        onChange(e)
                                        onCategoryChange(e)
                                        setSelectC(e)
                                    }}
                                >
                                    {categories && categories.map((i, index) => (
                                        <Checkbox key={index} value={i} className="capitalize">{i}</Checkbox>
                                    ))}
                                </CheckboxGroup>
                            </div>
                        )}/>
        </div>
    );
};

export default Sidebar;
