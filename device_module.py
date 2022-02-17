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

    if ('device_id' in attributes):
        f.write("device_id: %s\n" % data['device_id'])
        print("device_id:", data['device_id'])

    if ('patient_id' in attributes):
        f.write("patient_id: %s\n" % data['patient_id'])
        print("patient_id:", data['patient_id'])

    if ('data' in attributes):
        if (data['data'].get('temperature')):
            f.write("temperature: %s %s\n" % (data['data']['temperature']['value'], data['data']['temperature']['unit']))
            print("temperature:", data['data']['temperature']['value'], data['data']['temperature']['unit'])
        if (data['data'].get('blood_pressure')):
            f.write("blood_pressure: %s %s\n" % (data['data']['blood_pressure']['value'], data['data']['blood_pressure']['unit']))
            print("blood_pressure:", data['data']['blood_pressure']['value'], data['data']['blood_pressure']['unit'])
        if (data['data'].get('pulse')):
            f.write("pulse: %s %s\n" % (data['data']['pulse']['value'], data['data']['pulse']['unit']))
            print("pulse", data['data']['pulse']['value'], data['data']['pulse']['unit'])
        if (data['data'].get('oxygen_level')):
            f.write("oxygen_level: %s %s\n" % (data['data']['oxygen_level']['value'], data['data']['oxygen_level']['unit']))
            print("oxygen_level", data['data']['oxygen_level']['value'], data['data']['oxygen_level']['unit'])
        if (data['data'].get('weight')):
            f.write("weight: %s %s\n" % (data['data']['weight']['value'], data['data']['weight']['unit']))
            print("weight", data['data']['weight']['value'], data['data']['weight']['unit'])
        if (data['data'].get('blood_sugar_level')):
            f.write("blood_sugar_level: %s %s\n" % (data['data']['blood_sugar_level']['value'], data['data']['blood_sugar_level']['unit']))
            print("weight", data['data']['blood_sugar_level']['value'], data['data']['blood_sugar_level']['unit'])


def main():
    logging.info('Started')

    # Testing the function of reading a JSON file
    file_name = 'test.json'
    data = read_device_json(file_name)
    create_data(data)

    logging.info('Finished')


if __name__ == "__main__":
    main()
