def event_parser(event: dict):
    if event['Records'][0]['eventSource'] == 'aws:sqs':
        return event['Records'][0]['body']
    return event['body']
