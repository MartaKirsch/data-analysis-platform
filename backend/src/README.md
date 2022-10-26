## Dla kafelka obliczeniowego 
/upload_file/<node_id> \
curl -F "file=@file.csv" -F "method=linear_regression" -F "type=text/csv" example.com 127.0.0.1:5000/upload_file/n1 \

returns: \
json({success=True}) \

## Dla kafelka zwracającego dane liczbowe
/get_numeric/<node_id> \
curl -X GET 127.0.0.1:5000/get_numeric/n1\

returns: \
json({"a": float, "b": float}) \
## Dla kafelka zwracającego obraz
/get_plot/<node_id> \
curl -X GET 127.0.0.1:5000/get_plot/n1 \

returns:
image/png \