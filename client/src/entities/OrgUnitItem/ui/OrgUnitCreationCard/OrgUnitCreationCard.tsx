import { memo, useCallback, useEffect, useState } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/Card';
import { Input } from '@/shared/ui/Input';
import { ListBox, ListBoxItem } from '@/shared/ui/Popups';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

import cls from './OrgUnitCreationCard.module.scss';
import { OrgUnitCreateData } from '../../model/types/orgUnitItem';


interface Props {
    className?: string;
    orgUnitsList: ListBoxItem<string>[]
    resetFlag: boolean
    setOrgUinitData: React.Dispatch<React.SetStateAction<OrgUnitCreateData | undefined>>
}

export const OrgUnitCreationCard = memo((props: Props) => {
    const { className, orgUnitsList, resetFlag, setOrgUinitData} = props

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [parentOrgUnitId, setParentOrgUnitId] = useState('')
    const [workingHours, setWorkingHours] = useState('')
    const [lunchBreak, setLunchBreak] = useState('')
    const [summary, setSummary] = useState('')

    const resetToDefault = useCallback( () => {
        setName('')
        setDescription('')
        setParentOrgUnitId('')
        setWorkingHours('')
        setLunchBreak('')
        setSummary('')
    }, []);

    useEffect(() => {
        setOrgUinitData ({
            name,
            description,
            workingHours,
            lunchBreak,
            summary,
            parentOrgUnitId: parentOrgUnitId || null
        })
    }, [description, lunchBreak, name, parentOrgUnitId, setOrgUinitData, summary, workingHours])

    useEffect(() => {
        resetToDefault()
    }, [resetFlag, resetToDefault])

    return (
        <Card border='border-slightly' padding='24' max className={classNames(cls.card, {}, [className])}>
            <VStack gap="24" max>

                <Text title="Информация о подразделении" size="l"/>

                <VStack gap="16" max>
        
                    <HStack gap="4" max>
                        <Text title={'Название подразделения:'} thin className={cls.text}/>
                        <Input 
                            inputVariant="bordered"
                            placeholder="Название подразделения"
                            value={name}
                            onChange={setName}
                        />
                    </HStack>
                    <HStack gap="4" max>
                        <Text title="Описание подразделения:" thin className={cls.text}/>
                        <Input
                            inputVariant="bordered"
                            placeholder="Описание подразделения"
                            value={description}
                            onChange={setDescription}
                        />
                    </HStack>

                    <HStack gap="4" max>
                        <Text title="ID родителя (опционально):" thin className={cls.text}/>

                        <ListBox
                            className={cls.listbox}
                            items={orgUnitsList}
                            value={parentOrgUnitId}
                            defaultValue='Опционально'
                            onChange={setParentOrgUnitId}
                        />

                    </HStack>


                    <HStack gap="4">

                        <Text title="Расписание (опционально):" thin className={cls.text}/>

                        <HStack gap="16" className={cls.workingHours}>
                            <Text title="Часы работы:" thin />
                            <Input
                                inputVariant="bordered"
                                className={cls.additionalInput}
                                placeholder="Часы работы"
                                value={workingHours}
                                onChange={setWorkingHours}
                            />
                        </HStack>

                        <HStack>
                            <Text title="Обеденный перерыв:" thin withoutWrap className={cls.additionalText}/>
                            <Input
                                inputVariant="bordered"
                                className={cls.additionalInput}
                                placeholder="Обеденный перерыв"
                                value={lunchBreak}
                                onChange={setLunchBreak}
                            />
                        </HStack>

                    </HStack>

                    <HStack gap="4" max align='start'>
                        <Text
                            title="Дополнителная информация:"
                            thin
                            className={classNames(cls.text, {}, [cls.additionalInfo])}
                        />
                        <Input
                            isTextArea
                            textareaVaraint="big"
                            className={cls.textarea}
                            placeholder="Дополнителная информация (опционально)"
                            value={summary}
                            onChange={setSummary}
                        />
                    </HStack>
        
                </VStack>

            </VStack>
        </Card>
    )}
);
