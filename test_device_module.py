import device_module

expected_data = {'device_id': 123, 'patient_id': 321, 'data': {'temperature': {'value': '98.6', 'unit': 'F'}, 'blood_pressure': {'value': '120/80', 'unit': 'mmHg'}, 'pulse': {'value': '60', 'unit': 'bpm'}, 'oxygen_level': {'value': '95', 'unit': '%'}, 'weight': {'value': '140', 'unit': 'lbs'}, 'blood_sugar_level': {'value': '100', 'unit': 'mg/dL'}}}


# Unit test for reading and using test.json 
def test_device_json():
	data = device_module.read_device_json('test.json')
	assert data == expected_data


# Unit test for using data 
# def test_device_data():
	# data = device_module.read_device_json('test.json')
	# device_module.create_data(data)
	# assert test.txt == expected_test.txt
