export interface EventDocument {
	_id: String;
	name: String;
	date: Date;
	hours: Number;
	maxVolunteers?: Number;
	minVolunteers?: Number;
	volunteers: Array<String>; // array of volunteer ids
}
