/* eslint-disable react-hooks/rules-of-hooks */
/**
 * Текстовый инпут/текстареа
 * @param className? - Проброс класса сверху
 * @param value? - Значение в инпуте
 * @param onChange? - Функция, что делать по изменению
 * @param readonly? - Флаг, отвечающий за работу инпута
 * @param isTextArea? - Флаг, большое ли поле ввода? (false=input (по-умолчанию) \ true=textArea)
 * @param inputVariant? - Варианты инпута. Отвечает за визуал ('normal' - по умолчанию)
 * @param textareaVaraint? - Варианты большого поля ввода ('autosize' - по умолчанию)
 * @param ref - передача ref (только для input)
*/

import React, { InputHTMLAttributes, useEffect, useRef } from 'react';

import { Mods, classNames } from '@/shared/lib/classNames/classNames';

import cls from './Input.module.scss';

type HTMLInputTeaxtAreaProps = Omit<
	InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>,
	'value' | 'onChange' | 'readOnly'
>;

interface InputTextAreaProps extends HTMLInputTeaxtAreaProps {
	className?: string;
	value?: string | number;
	onChange?: (value: string) => void;
	readonly?: boolean;
}

interface InputProps extends InputTextAreaProps {
    isTextArea?: false;
	inputVariant?: 'normal' | 'clear' | 'bordered';
}

interface TextAreaProps extends InputTextAreaProps {
    isTextArea: true;
    textareaVaraint?: 'big' | 'autosize';
}

type InputCommonProps = InputProps | TextAreaProps;

export const Input = React.forwardRef((props: InputCommonProps, ref:React.ForwardedRef<HTMLInputElement>) => {
    const {
        className,
        value,
        onChange,
        readonly,
        isTextArea,
        ...otherProps
    } = props;

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onChange?.(e.target.value);
    };

    const mods: Mods = {
        [cls.readonly]: readonly,
    };

    // В случае если поле - input

    if (!isTextArea) {
        const inputProps = Object.assign({...otherProps}); // для фикса ошибки 'react doesnt recognize the inputVariant Prop..'
        const {inputVariant = 'normal', ...otherInputProps} = inputProps;
    
        return (
            <input
                className={classNames(cls.Input, mods, [className, cls[inputVariant]])}
                type='text'
                value={value}
                onChange={onChangeHandler}
                readOnly={readonly}
                ref={ref}
                {...otherInputProps}
            />
        );
    }

    // В случае если поле - textArea

    const textAreaProps = Object.assign({...otherProps}); // для фикса ошибки 'react doesnt recognize the textareaVaraint Prop..'
    const { textareaVaraint = 'autosize', ...otherTextAreaProps } = textAreaProps;

    const autosizeTextareaRef = useRef<HTMLTextAreaElement | null> (null);

    useEffect(() => {
        if(autosizeTextareaRef && autosizeTextareaRef.current) {
            autosizeTextareaRef.current.style.height = '0px';
            const scrollHeight = autosizeTextareaRef.current.scrollHeight;
            autosizeTextareaRef.current.style.height = scrollHeight + 'px';
        }
    }, [value])

    return (
        <textarea
            className={classNames(cls.textarea, mods, [cls[textareaVaraint], className])}
            type='text'
            value={value}
            onChange={onChangeHandler}
            readOnly={readonly}
            {...otherTextAreaProps}
            ref={textareaVaraint == 'autosize' ? autosizeTextareaRef : null}
        />
    );

});
