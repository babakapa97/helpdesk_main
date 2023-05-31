import requests

bot_token = '6006609016:AAFVt3SAOPvVpElrwqK3UJu_Mm7V6PzrG0I'
channel_chat_id = '-1001701207208'


def send_message_about_new_ticket(ticket_id, title, category):

    message = f'Новая заявка #{ticket_id}\nНазвание: {title}\nКатегория: {category}'
    url = f'https://api.telegram.org/bot{bot_token}/sendMessage'
    params = {
        'chat_id': channel_chat_id,
        'text': message
    }

    response = requests.post(url, json=params)
    if response.status_code == 200:
        print('Сообщение успешно отправлено в канал')
    else:
        print('Ошибка при отправке сообщения в канал')


def send_message_about_new_comment(ticket_id, title, category, comment, author):

    message = f'Новый комментарий к заявке #{ticket_id}\nНазвание: {title}\nКатегория: {category}\nКомментарий: {comment}\nАвтор: {author}'
    url = f'https://api.telegram.org/bot{bot_token}/sendMessage'
    params = {
        'chat_id': channel_chat_id,
        'text': message
    }

    response = requests.post(url, json=params)
    if response.status_code == 200:
        print('Сообщение успешно отправлено в канал')
    else:
        print('Ошибка при отправке сообщения в канал')


def send_message_about_update_ticket(ticket_id, title, category, status):

    message = f'Обновлена заявка #{ticket_id}\nНазвание: {title}\nКатегория: {category}\nСтатус: {status}'
    url = f'https://api.telegram.org/bot{bot_token}/sendMessage'
    params = {
        'chat_id': channel_chat_id,
        'text': message
    }

    response = requests.post(url, json=params)
    if response.status_code == 200:
        print('Сообщение успешно отправлено в канал')
    else:
        print('Ошибка при отправке сообщения в канал')