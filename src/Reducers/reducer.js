/////////////////CONSTANTS/////////////////////
const ADD_CHORD = "ADD_CHORD";
const REMOVE_CHORD = "REMOVE_CHORD";
const SUGGEST_CHORD = "SUGGEST_CHORD";
/////////////////ACTIONS//////////////
const addChord = (chord) => ({type: ADD_CHORD, chord});
const removeChord = (chord) => ({type: REMOVE_CHORD, chord});
const suggestChord = (chord) => ({type: SUGGEST_CHORD, chord});
/////////////////REDUCER/////////////////////
//initiate your starting state
let initial = {
  selectedChords: [],
  suggestedChords: []
};
const reducer = (state = initial, action) => {
  switch (action.type) {
    case ADD_CHORD:
      return {
        ...state,
        suggestedChords: state.suggestedChords
      }
      return Object.assign({}, state, {tasks: action.tasks.objects});
    case REMOVE_CHORD:
      let updatedTasks = [action.task].concat(state.tasks);
      return Object.assign({}, state, {tasks: updatedTasks});
    case SUGGEST_CHORD:
      let newArr = state.tasks.map((task) => {
        if(task.slug === action.task.slug) task.metafields[0].value = !task.metafields[0].value;
        return task;
      });
      return Object.assign({}, state, {tasks: newArr});
    default:
      return state;
  }
};
export default reducer;

/////////////// ACTION DISPATCHER FUNCTIONS///////////////////
export const getAllTasks = () => dispatch => {
  axios.get(`https://api.cosmicjs.com/v1/your-bucket-slug-name/object-type/tasks`)
    .then((response) => {
      return response.data;
    })
    .then((tasks) => {
      dispatch(getTasks(tasks))
    })
    .catch((err) => {
      console.error.bind(err);
    })
};
export const postNewTask = (task) => dispatch => {
  dispatch(addTask({title: task, metafields: [{value: false}], slug: formatSlug(task)}));
  axios.post(`https://api.cosmicjs.com/v1/your-bucket-slug-name/add-object`, {type_slug: "tasks", title: task, content: "New Task",
    metafields: [
      {
        title: "Is Complete",
        key: "is_complete",
        value: false,
        type: "text"
      }
    ]})
    .then((response) => {
      console.log(response.data);
    })
    .catch((err) => {
      console.error.bind(err);
    })
};
export const putChangeStatus = (task, bool) => (dispatch) => {
  dispatch(changeStatus(task));

};
export const deleteTask = (slug) => (dispatch) => {
  dispatch(taskDelete(slug));

};
const formatSlug = (title) => {
  let lower = title.toLowerCase();
  return lower.split(" ").join("-");
};
