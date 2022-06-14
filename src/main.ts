import { v4 } from 'uuid';
import Toastify from 'toastify-js';

import 'toastify-js/src/toastify.css';
import './style.css';

interface Task {
   id: string;
   title: string;
   description: string;
}

let tasks: Task[] = [];

document.addEventListener('DOMContentLoaded', () => {
   renderTaks();
   taskFormListener();
});

function taskFormListener() {
   const $taskForm = document.querySelector<HTMLFormElement>('#taskForm');

   $taskForm?.addEventListener('submit', (e) => {
      e.preventDefault();

      const $title = $taskForm['title'] as unknown as HTMLInputElement;
      const $description = $taskForm[
         'description'
      ] as unknown as HTMLTextAreaElement;

      tasks.push({
         id: v4(),
         title: $title.value,
         description: $description.value,
      });

      localStorage.setItem('tasks', JSON.stringify(tasks));

      Toastify({
         text: 'Task added',
         style: {
            backgroundColor: 'linear-gradient(to right, #00b09b, #96c93d)',
         },
      }).showToast();

      renderTaks();
      $taskForm.reset();
      $title.focus();
   });
}

function renderTaks() {
   tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

   const $taskList = document.querySelector<HTMLUListElement>('#taskList');

   $taskList!.innerHTML = '';
   tasks.forEach((task) => {
      const $mainContainer = document.createElement('div');
      $mainContainer.className = 'flex justify-between';

      const $taskContainer = document.createElement('div');
      $taskContainer.className = 'flex-1';

      $taskContainer.innerHTML = `
               <h3>${task.title}</h3>
               <p>${task.description}</p>
               <p class="text-gray-400 text-xs">${task.id}</p>
      `;

      const $deleteButton = document.createElement('button');
      $deleteButton.className =
         'bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full';
      $deleteButton.innerText = 'Delete';
      $deleteButton.addEventListener('click', () => {
         deleteTask(task.id);
      });

      const $deleteButtonContainer = document.createElement('div');
      $deleteButtonContainer.appendChild($deleteButton);

      $mainContainer.appendChild($taskContainer);
      $mainContainer.appendChild($deleteButtonContainer);

      const $task = document.createElement('li');
      $task.className =
         'bg-zinc-800 mb-1 p-4 rounded-lg hover:bg-zinc-700 hover:cursor-pointer';
      $task.appendChild($mainContainer);

      $taskList!.appendChild($task);
   });
}

function deleteTask(id: string) {
   console.log(id);
   tasks = tasks.filter((task) => task.id !== id);
   localStorage.setItem('tasks', JSON.stringify(tasks));
   renderTaks();
}
