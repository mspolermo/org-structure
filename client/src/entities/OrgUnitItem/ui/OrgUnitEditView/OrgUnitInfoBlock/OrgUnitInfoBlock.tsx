import { observer } from 'mobx-react';
import { useCallback, useEffect, useState } from 'react';

import { OrgUnitItem, OrgUnitUpdateData } from '@/entities/OrgUnitItem/model/types/orgUnitItem';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/Card';
import { Input } from '@/shared/ui/Input';
import { HStack, VStack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";


import cls from './OrgUnitInfoBlock.module.scss';

interface Props {
	className?: string;
    orgUnit: OrgUnitItem;
    isEdit: boolean;
    isCancelled: boolean;
    setUpdatedOrgUnit: React.Dispatch<React.SetStateAction<OrgUnitUpdateData | null>>
}

export const OrgUnitInfoBlock = observer((props: Props) => {
    const { className, isEdit, orgUnit, isCancelled, setUpdatedOrgUnit } = props

    const [name, setName] = useState(orgUnit.name)
    const [description, setDescription] = useState(orgUnit.description || "")
    const [summary, setSummary] = useState(orgUnit.summary || "")

    const [lunchBreak, setLunchBreak] = useState(orgUnit.lunchBreak || "")
    const [workingHours, setWorkingHours] = useState(orgUnit.workingHours || "")

    const resetToDefault = useCallback(() => {
        setName(orgUnit.name)
        setDescription(orgUnit.description || '')
        setSummary(orgUnit.summary || '')
        setLunchBreak(orgUnit.lunchBreak)
        setWorkingHours(orgUnit.workingHours)
    }, [orgUnit.description, orgUnit.lunchBreak, orgUnit.name, orgUnit.summary, orgUnit.workingHours])

    useEffect(() => {
        setUpdatedOrgUnit(
            {
                name,
                description,
                summary,
                lunchBreak,
                workingHours
            }
        )
    }, [description, lunchBreak, name, orgUnit, setUpdatedOrgUnit, summary, workingHours])

    useEffect(() => {
        resetToDefault()
    } ,[isCancelled, resetToDefault])

    return (
        <Card border='border-slightly' padding='24' max className={classNames(cls.OrgUnitEditView, {}, [className])}>
            <VStack gap="24" max>

                <Text title="Информация о подразделении" size="xl"/>

                <VStack gap="16" max>
                    
            
                    <HStack gap="4" max>
                        <Text title={'Название подразделения:'} thin className={cls.text}/>
                        <Input 
                            inputVariant="bordered"
                            placeholder="Название подразделения"
                            value={name}
                            onChange={setName}
                            readonly={!isEdit}
                        />
                    </HStack>
                    <HStack gap="4" max>
                        <Text title="Описание подразделения:" thin className={cls.text}/>
                        <Input
                            inputVariant="bordered"
                            placeholder="Описание подразделения"
                            value={description}
                            onChange={setDescription}
                            readonly={!isEdit}
                        />
                    </HStack>


                    <HStack gap="4">

                        <Text title="Расписание:" thin className={cls.text}/>

                        <HStack gap="16" className={cls.workingHours}>
                            <Text title="Часы работы:" thin />
                            <Input
                                inputVariant="bordered"
                                className={cls.additionalInput}
                                placeholder="Часы работы"
                                value={workingHours}
                                onChange={setWorkingHours}
                                readonly={!isEdit}
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
                                readonly={!isEdit}
                            />
                        </HStack>

                    </HStack>



                    <HStack gap="4" max align='start'>
                        <Text title="Дополнителная информация:" thin className={classNames(cls.text, {}, [cls.additionalInfo])}/>
                        <Input
                            isTextArea
                            textareaVaraint="big"
                            className={cls.textarea}
                            placeholder="Дополнителная информация"
                            value={summary}
                            onChange={setSummary}
                            readonly={!isEdit}
                        />
                    </HStack>
                    
                </VStack>

            </VStack>
        </Card>
    );
});
