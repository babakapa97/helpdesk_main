import telebot
import requests
from telebot import types

# Установите токен API вашего бота
bot_token = '6006609016:AAFVt3SAOPvVpElrwqK3UJu_Mm7V6PzrG0I'


# Создайте экземпляр бота
bot = telebot.TeleBot(bot_token)

# Словарь для хранения описания заявок
descriptions = {}


# Обработчик команды /start
@bot.message_handler(commands=['start'])
def start(message):
    bot.send_message(message.chat.id, 'Добро пожаловать! Меня зовут Вита, я виртуальный ассистент. Чем могу помочь?')


# Обработчик текстовых сообщений для заголовка
@bot.message_handler(func=lambda message: True)
def handle_title(message):
    # Сохраняем заголовок из сообщения пользователя
    title = message.text

    # Просим пользователя ввести описание
    bot.send_message(message.chat.id, 'Поняла. Можете описать проблему подробнее?')

    # Меняем обработчик на обработчик описания
    bot.register_next_step_handler(message, handle_description, title)


# Обработчик текстовых сообщений для описания
def handle_description(message, title):
    # Сохраняем описание из сообщения пользователя
    description = message.text

    # Сохраняем chat_id, title и description в словарь descriptions
    chat_id = message.chat.id
    descriptions[chat_id] = {
        'title': title,
        'description': description
    }

    # Просим пользователя ввести фамилию
    bot.send_message(message.chat.id, 'Как с вами связаться?')

    # Меняем обработчик на обработчик фамилии
    bot.register_next_step_handler(message, handle_surname)


# Обработчик текстовых сообщений для фамилии
def handle_surname(message):
    surname = message.text

    chat_id = message.chat.id
    description = descriptions.get(chat_id, {}).get('description', '')

    full_description = surname + ': ' + description

    descriptions[chat_id]['description'] = full_description

    # Создаем инлайн-клавиатуру с кнопками категорий
    keyboard = types.InlineKeyboardMarkup()
    keyboard.add(types.InlineKeyboardButton('Информационные системы', callback_data='1'))
    keyboard.add(types.InlineKeyboardButton('ПК, орг.техника', callback_data='2'))
    keyboard.add(types.InlineKeyboardButton('ИБ, ЗСПД', callback_data='3'))
    keyboard.add(types.InlineKeyboardButton('Админы МО', callback_data='4'))
    keyboard.add(types.InlineKeyboardButton('Другое', callback_data='5'))

    # Отправляем сообщение с кнопками выбора категории
    bot.send_message(message.chat.id, 'Выберите категорию заявки:', reply_markup=keyboard)


# Обработчик нажатия на кнопку категории
@bot.callback_query_handler(func=lambda call: True)
def handle_category(call):
    category = call.data

    # Отправляем заявку в helpdesk-систему
    response = send_request_to_helpdesk(call.message.chat.id, category)

    if response.status_code == 200:
        bot.send_message(call.message.chat.id, 'Заявка успешно отправлена в helpdesk-систему. Специалисты техподдержки свяжутся с вами в течение 2-ух часов.')
    else:
        bot.send_message(call.message.chat.id, 'Произошла ошибка при отправке заявки в helpdesk-систему.')


# Функция отправки заявки в helpdesk-систему
def send_request_to_helpdesk(chat_id, category):
    url = 'http://localhost:8000/api/tickets/create/'

    headers = {
        'Content-Type': 'application/json'
    }

    # Получаем сохраненное описание заявки по chat_id
    description = descriptions.get(chat_id, {}).get('description', '')

    payload = {
        'title': descriptions[chat_id]['title'],
        'description': description,
        'status': {
            'status_id': '1'
        },
        'category': {
            'category_id': category
        },
        'author': '4'
    }

    response = requests.post(url, json=payload, headers=headers)

    return response


# Запуск бота
bot.polling()