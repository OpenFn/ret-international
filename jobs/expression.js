alterState(state => {
  function clean(obj) {
    for (var propName in obj) {
      if (obj[propName] === '-' || obj[propName] === null) {
        delete obj[propName];
      }
    }
  }
  
function manualFieldExclude(){
  state.data.body._attachments = null;
  state.data.body._geolocation = null;
  state.data.body._notes = null;
  state.data.body._submitted_by= null;
  state.data.body._tags= null;
  state.data.body._validation_status= null;
}
  
const genderTransformations = {
  'female': 'f',
  'male': 'm'
};

function transformGender(value){
  let gender = genderTransformations[value.toString().toLowerCase()];
  state.data.body.gender = gender? gender: null;
}

const keyMappings = {
  "Age": "age",
  "First_Name": "first_name",
  "Gender": "gender",
  "Last_Name": "last_name",
  "Services": "services",
  "end": "_end",
  "formhub/uuid": "_formhub_uuid",
  "meta/instanceID": "_meta_instance_id",
  "start": "_start"
};

function mapSourceToDestinationFields(obj, keyMap){
  for(var [old_key, new_key] of Object.entries(keyMap)){
    if(obj[old_key]){
      obj[new_key] = obj[old_key];
      delete obj[old_key];
    }
  }
}

// step 1: map source/destination keys
mapSourceToDestinationFields(state.data.body, keyMappings);

// step 2: transform data
transformGender(state.data.body.gender);

// step 3: exclude null fields, manually, until we have built
// better helpers for nullability checks/type casting
manualFieldExclude();

// step 4: clean data for insert payload
clean(state.data.body);

  return state;
});

// step 4: insert data
upsert(
  'beneficiary_registration',
  '_id',
  state.data.body,
  {writeSql:true, execute: true}
);
