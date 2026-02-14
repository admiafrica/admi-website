'use client'

import { useState, useEffect } from 'react'
import { Container, Title, Card, Text, Group, Badge, Table, Loader, Alert, Button } from '@/lib/tw-mantine'

interface SpamLog {
  timestamp: string
  ip: string
  url: string
  reason: string
  userAgent: string
  referer: string
}

interface SpamStats {
  totalAttempts: number
  uniqueIPs: number
  topReasons: Array<{ reason: string; count: number }>
  recentAttempts: number
}

export default function SpamMonitorPage() {
  const [stats, setStats] = useState<SpamStats | null>(null)
  const [logs, setLogs] = useState<SpamLog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/spam-monitor', {
        headers: {
          Authorization: 'Bearer admin-token'
        }
      })

      if (!response.ok) {
        throw new Error('Failed to fetch spam data')
      }

      const data = await response.json()
      setStats(data.stats)
      setLogs(data.logs)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    // Refresh every 30 seconds
    const interval = setInterval(fetchData, 30000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <Container size="xl" py="xl">
        <Group justify="center">
          <Loader size="lg" />
          <Text>Loading spam monitor data...</Text>
        </Group>
      </Container>
    )
  }

  if (error) {
    return (
      <Container size="xl" py="xl">
        <Alert color="red" title="Error">
          {error}
        </Alert>
        <Button onClick={fetchData} mt="md">
          Retry
        </Button>
      </Container>
    )
  }

  return (
    <Container size="xl" py="xl">
      <Title order={1} mb="xl">
        Spam Monitor Dashboard
      </Title>

      {stats && (
        <Group mb="xl" grow>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text size="sm" c="dimmed">
              Total Spam Attempts
            </Text>
            <Text fw={500} size="xl">
              {stats.totalAttempts}
            </Text>
          </Card>

          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text size="sm" c="dimmed">
              Unique IPs
            </Text>
            <Text fw={500} size="xl">
              {stats.uniqueIPs}
            </Text>
          </Card>

          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text size="sm" c="dimmed">
              Recent Attempts
            </Text>
            <Text fw={500} size="xl">
              {stats.recentAttempts}
            </Text>
          </Card>
        </Group>
      )}

      {stats?.topReasons && stats.topReasons.length > 0 && (
        <Card shadow="sm" padding="lg" radius="md" withBorder mb="xl">
          <Title order={3} mb="md">
            Top Spam Reasons
          </Title>
          <Group gap="xs">
            {stats.topReasons.map((reason, index) => (
              <Badge key={index} variant="light" size="lg">
                {reason.reason} ({reason.count})
              </Badge>
            ))}
          </Group>
        </Card>
      )}

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Group justify="space-between" mb="md">
          <Title order={3}>Recent Spam Attempts</Title>
          <Button onClick={fetchData} variant="light" size="sm">
            Refresh
          </Button>
        </Group>

        {logs.length > 0 ? (
          <Table.ScrollContainer minWidth={800}>
            <Table striped highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Timestamp</Table.Th>
                  <Table.Th>IP Address</Table.Th>
                  <Table.Th>URL</Table.Th>
                  <Table.Th>Reason</Table.Th>
                  <Table.Th>User Agent</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {logs.map((log, index) => (
                  <Table.Tr key={index}>
                    <Table.Td>{new Date(log.timestamp).toLocaleString()}</Table.Td>
                    <Table.Td>{log.ip}</Table.Td>
                    <Table.Td style={{ maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {log.url}
                    </Table.Td>
                    <Table.Td>{log.reason}</Table.Td>
                    <Table.Td style={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {log.userAgent}
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Table.ScrollContainer>
        ) : (
          <Text c="dimmed" ta="center" py="xl">
            No spam attempts recorded yet
          </Text>
        )}
      </Card>
    </Container>
  )
}
