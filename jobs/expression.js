upsert(
  'beneficiary_registration',
  'formhub_uuid',
  {
    xform_id_string: state.data.body._xform_id_string,
    age: state.data.body.Age,
    first_name: state.data.body.First_Name,
    gender: state.data.body.Gender,
    last_name: state.data.body.Last_Name,
    services: state.data.body.Services,
    version: state.data.body.__version__,
    attachments: state.data.body._attachments,
    geolocation: state.data.body._geolocation,
    id: state.data.body._id,
    notes: state.data.body._notes,
    status: state.data.body._status,
    submission_time: state.data.body._submission_time,
    submitted_by: state.data.body._submitted_by,
    tags: state.data.body._tags,
    uuid_column: state.data.body._uuid,
    validation_status: state.data.body._validation_status,
    end_time: state.data.body.end,
    formhub_uuid: state.data.body['formhub/uuid'],
    meta_instance_id: state.data.body['meta/instanceID'],
    start_time: state.data.body.start
  }
);
