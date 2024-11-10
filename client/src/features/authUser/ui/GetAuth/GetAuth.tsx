import { memo, useState } from "react";

import { Button } from "@/shared/ui/Button";
import { Card } from "@/shared/ui/Card";
import { Input } from "@/shared/ui/Input";
import { HStack, VStack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";

const GetAuth = memo(() => {

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    return (
        <Card border='border-slightly' padding='24' max>
            <VStack gap="16" max>

                <Text title="Пожалуйста авторизируйтесь" />

                <HStack gap="16" max>
                    <Text title={'Email:'} thin />
                    <Input 
                        inputVariant="bordered"
                        placeholder="Введите email"
                        value={login}
                        onChange={setLogin}
                    />
                </HStack>

                <HStack gap="16" max>
                    <Text title={'Пароль:'} thin />
                    <Input 
                        inputVariant="bordered"
                        placeholder="Введите пароль"
                        value={password}
                        onChange={setPassword}
                    />
                </HStack>

                <Button>Войти</Button>
            </VStack>
        </Card>
    );
});

export default GetAuth;
