import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions';

async function getPermission() {
    let { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
    if (status === 'granted') {
        setNotification()
    } else {
        console.warn('erro', status)
    }
}

async function setNotification() {
    let { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS)
    if (status === 'granted') {
        Notifications.cancelAllScheduledNotificationsAsync()
        Notifications.scheduleLocalNotificationAsync({
            title: "Lembre de estudar",
            body: 'Faça um pouco por dia'
        },
            {
                time: (new Date()).getTime() + 1000,
                repeat: 'minute'
            })
    }
}

export {
    getPermission,
    setNotification
}