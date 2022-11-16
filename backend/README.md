## Joining calculation node with file node
./calculate/<node_id>

input:
{
    file: File,
    calculationType: string
}

curl example:
curl -F "file=@file.csv" -F "calculationType=linear_regression" -F 127.0.0.1:5000/calculate/n1

response:
status(200 or 400 before more complex error handling)

## Clicking on calculation node
./result/<node_id>
input:
{
    json: {resultType : string("plot"/"file")}
}

curl example:
curl -H "Content-Type: application/json"  -X POST -d "{\"resultType\": \"plot\"}" 127.0.0.1:5000/result/n1

response:
if resultType=="plot"
png image(name : node_id.png)
if resultType=="file"
csv file(name : node_id.csv)

## Wiping the board after exit from page
./wipe_board

curl example:
curl -X POST 127.0.0.1:5000/wipe_board

### Calculation function list

| function | multipart calculationType key |
| ----------- | ----------- |
| linear regression | linear_regression |




