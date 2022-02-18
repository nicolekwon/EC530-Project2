import json
import logging


# Reading a JSON file about a device
def read_device_json(file_name):

    # Opening JSON file
    f = open(file_name)
     
    # Returning JSON object as a dictionary
    data = json.load(f)

    # Closing file
    f.close()
    return data


def create_data(data):

    # Creating txt file
    f = open('test.txt','w+')

    # Manually checking through what was read from JSON file
    attributes = data.keys()

    # Validating if JSON file is formatted correctly
    if ('device_id' in attributes and 'user_id' in attributes and 'data' in attributes):

        # Checking if device_id is valid
        if ('device_id' in attributes):
            f.write("device_id: %s\n" % data['device_id'])
            print("device_id:", data['device_id'])

        # Checking if user_id is valid
        if ('user_id' in attributes):
            f.write("user_id: %s\n" % data['user_id'])
            print("user_id:", data['user_id'])

        # Checking 
        if ('data' in attributes):
            if (data['data'].get('temperature')):
                if (float(data['data']['temperature']['value']) > 0) and (data['data']['temperature']['unit'] == 'F' or data['data']['temperature']['unit'] == 'C'):
                    f.write("temperature: %s %s\n" % (data['data']['temperature']['value'], data['data']['temperature']['unit']))
                    print("temperature:", data['data']['temperature']['value'], data['data']['temperature']['unit'])
            if (data['data'].get('blood_pressure')):
                if (data['data']['blood_pressure']['value'].find('/') != -1) and data['data']['blood_pressure']['unit'] == 'mmHg':
                    f.write("blood_pressure: %s %s\n" % (data['data']['blood_pressure']['value'], data['data']['blood_pressure']['unit']))
                    print("blood_pressure:", data['data']['blood_pressure']['value'], data['data']['blood_pressure']['unit'])
            if (data['data'].get('pulse')):
                if (float(data['data']['pulse']['value']) > 0) and data['data']['pulse']['unit'] == 'bpm':
                    f.write("pulse: %s %s\n" % (data['data']['pulse']['value'], data['data']['pulse']['unit']))
                    print("pulse:", data['data']['pulse']['value'], data['data']['pulse']['unit'])
            if (data['data'].get('oxygen_level')):
                if (float(data['data']['oxygen_level']['value']) > 0) and data['data']['oxygen_level']['unit'] == '%':
                    f.write("oxygen_level: %s %s\n" % (data['data']['oxygen_level']['value'], data['data']['oxygen_level']['unit']))
                    print("oxygen_level:", data['data']['oxygen_level']['value'], data['data']['oxygen_level']['unit'])
            if (data['data'].get('weight')):
                if (float(data['data']['weight']['value']) > 0) and data['data']['weight']['unit'] == 'lbs':
                    f.write("weight: %s %s\n" % (data['data']['weight']['value'], data['data']['weight']['unit']))
                    print("weight:", data['data']['weight']['value'], data['data']['weight']['unit'])
            if (data['data'].get('blood_sugar_level')):
                if (float(data['data']['blood_sugar_level']['value']) > 0) and (data['data']['blood_sugar_level']['unit'] == 'mg/dL' or data['data']['blood_sugar_level']['unit'] == 'mmol/L'):
                    f.write("blood_sugar_level: %s %s\n" % (data['data']['blood_sugar_level']['value'], data['data']['blood_sugar_level']['unit']))
                    print("blood_sugar_level:", data['data']['blood_sugar_level']['value'], data['data']['blood_sugar_level']['unit'])


def main():
    logging.info('Started')

    # Testing the function of reading a JSON file
    file_name = 'test.json'
    data = read_device_json(file_name)
    create_data(data)

    logging.info('Finished')


if __name__ == "__main__":
    main()
