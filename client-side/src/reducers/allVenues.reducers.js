// import { venueConstants } from '../actions/constants';

// const initialState = {
//     message: '',
//     allVenues: [],
//     loading: false
// }

// const venuesInfoReducer = (state = initialState, action) => {
//     console.log(action);
//     switch (action.type) {
//         case venueConstants.GETALL_VENUES_REQUEST:
//             state = {
//                 ...state,
//                 loading: true
//             }
//             break;
//         case venueConstants.GETALL_VENUES_SUCCESS:
//             state = {
//                 ...state,
//                 loading: false,
//                 allVenues: action.payload.slice(0).reverse()
//             }
//             break;
//         case venueConstants.GETALL_VENUES_FAILURE:
//             state = {
//                 ...state,
//                 loading: false,
//                 message: 'Something went wrong...!'
//             }
//             break;

//         default:
//             break;
//     }
//     return state;
// }

// export default venuesInfoReducer


import { venueConstants } from '../actions/constants';

const initialState = {
  message: '',
  allVenues: [],
  loading: false,
  error: null,
};

const venuesInfoReducer = (state = initialState, action) => {
console.log(action);
  switch (action.type) {
    case venueConstants.GETALL_VENUES_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case venueConstants.GETALL_VENUES_SUCCESS:
      state = {
        ...state,
        loading: false,
        allVenues: action.payload.slice(0).reverse(),
      }
      break;
    case venueConstants.GETALL_VENUES_FAILURE:
      state = {
        ...state,
        loading: false,
        message: 'Something went wrong...!',
      }
      break;
    case venueConstants.DELETE_VENUE_REQUEST: // Add this block
      state = {
        ...state,
        loading: true,
      };
      break;
    case venueConstants.DELETE_VENUE_SUCCESS: // Add this block
      state = {
        ...state,
        loading: false,
        allVenues: state.allVenues.filter(venue => venue._id !== action.payload.venueId),
      };
      break;
    case venueConstants.DELETE_VENUE_FAILURE: // Add this block
      state = {
        ...state,
        loading: false,
        message: 'Failed to delete venue...',
      };
      break;
    default:
      break;
  }
  return state;
}

export default venuesInfoReducer;


// import { venueConstants } from '../actions/constants';

// const initialState = {
//     message: '',
//     allVenues: [],
//     loading: false
// }

// const venuesInfoReducer = (state = initialState, action) => {
//     console.log(action);
//     switch (action.type) {
//         case venueConstants.GETALL_VENUES_REQUEST:
//             state = {
//                 ...state,
//                 loading: true
//             }
//             break;
//         case venueConstants.GETALL_VENUES_SUCCESS:
//             state = {
//                 ...state,
//                 loading: false,
//                 allVenues: action.payload.slice(0).reverse()
//             }
//             break;
//         case venueConstants.GETALL_VENUES_FAILURE:
//             state = {
//                 ...state,
//                 loading: false,
//                 message: 'Something went wrong...!'
//             }
//             break;

//         default:
//             break;
//     }
//     return state;
// }

// export default venuesInfoReducer