from telegram.ext import Updater, CommandHandler

# Функция, вызываемая при получении команды /start
def start(update, context):
    context.bot.send_message(chat_id=update.effective_chat.id, text="Привет, я бот!")

# Создание экземпляра бота и передача токена
updater = Updater(token='YOUR_BOT_TOKEN', use_context=True)

# Получение диспетчера обработчиков
dispatcher = updater.dispatcher

# Зарегистрировать обработчик команды /start
start_handler = CommandHandler('start', start)
dispatcher.add_handler(start_handler)

# Запуск бота
updater.start_polling()
