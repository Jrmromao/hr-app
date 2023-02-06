def event_parser(event: dict):
    if 'body' in event.keys():
        return event['body']
    return event['Records'][0]['body']
