export default function About() {
    return (
        <div className="space-y-8">
            <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-indigo-700 mb-4">О SortMeister</h1>
                <div className="space-y-4 text-gray-700">
                    <p>
                        SortMeister — это демо-проект, рожденный в недрах учебной программы UpTeam.
                        Здесь мы соединили фронтенд и бэкенд так лихо, что даже <span
                        className="italic">Java</span> и <span className="italic">React </span>
                        начали понимать друг друга без переводчика!
                    </p>
                    <p>
                        <span className="font-semibold text-indigo-600">Что внутри?</span>
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Визуализация алгоритмов сортировки — наблюдайте, как ваши данные танцуют упорядоченный
                            танец
                        </li>
                        <li>REST API — потому что фронтенд без бэкенда, как чипсы без пива</li>
                        <li>Тесты через Postman + Swagger — чтобы всё работало, даже если вы случайно накосячили</li>
                        <li>Чистый и модульный код — мы же не животные, в конце концов!</li>
                    </ul>
                    <p className="pt-2 font-medium">
                        Сделано студентами для студентов — учимся, ошибаемся, но главное — не забываем коммитить!
                    </p>
                </div>
            </div>

            <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-indigo-700 mb-4">About SortMeister</h1>
                <div className="space-y-4 text-gray-700">
                    <p>
                        SortMeister is a demo project developed for the UpTeam educational program.
                        We've bridged frontend and backend so smoothly that even <span
                        className="italic">Java</span> and <span className="italic">React</span>
                        now communicate without a middleman!
                    </p>
                    <p>
                        <span className="font-semibold text-indigo-600">Key features:</span>
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><span className="font-medium">Sorting algorithm visualization</span> — watch your data
                            organize itself in a dance of efficiency
                        </li>
                        <li><span className="font-medium">REST API integration</span> — because frontend without backend
                            is like a car without an engine
                        </li>
                        <li><span className="font-medium">Postman + Swagger testing</span> — ensuring reliability even
                            when human errors occur
                        </li>
                        <li><span className="font-medium">Clean modular codebase</span> — because maintainability
                            matters
                        </li>
                    </ul>
                    <p className="pt-2 font-medium">
                        Created by students for students — where mistakes are lessons, and every commit counts!
                    </p>
                </div>
            </div>
        </div>
    );
}