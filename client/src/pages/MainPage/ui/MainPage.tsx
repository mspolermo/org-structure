import { memo } from 'react';

import { Card } from '@/shared/ui/Card';
import { HStack, getVStack } from '@/shared/ui/Stack';
import { Text } from "@/shared/ui/Text";
import { Page } from "@/widgets/Page";


const MainPage = memo(() => {

    const data = {
        date: '01.03.2024', 
        title: 'Объявление на главной странице',
        body: `
        Уважаемые коллеги! 
        Просьба ознакомиться с данным объявлением. Оно будет присутствовать на сайте.
        В данном объявлении мы рассказываем о наших планах на текущий год. 
        Приятного просмотра!
        С уважением, Администрация сайта.
        `
    };


    const component = (object: { date: string; title: string; body: string; }) => {
        const { date, title, body } = object;
        return (
            <Card padding={'24'} style={{marginBottom: '20px'}}>
                <HStack gap='16' justify='between' align='center' style={{paddingBottom: '14px'}}>
                    <Text title={title} bold size='l'/>
                    <Text align='right' text={date} size='s'/>
                </HStack>

                <hr style={{borderTop: '1px solid var(--divider-color)', padding: '10px 0'}}></hr>

                <Text text={body}/>

            </Card>
        )
    }

    return (
        <Page header='Главная страница' className={getVStack({align: 'start', gap:'32', max: true})}>

            {component(data)}

        </Page>
    );
});

export default MainPage;
