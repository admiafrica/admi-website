'use client'

import { Box, Container, Group, Title, Text } from '@mantine/core'
import Link from 'next/link'

export default function AcademyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Box component="header" h={60} p="xs" style={{ boxShadow: 'var(--mantine-shadow-xs)' }}>
        <Container
          size="lg"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '100%'
          }}
        >
          <Link href="/academy" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Title order={3}>ADMI AI Academy</Title>
          </Link>
          <Group gap="xl">
            <Link href="/academy/paths" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Text>Learning Paths</Text>
            </Link>
            <Link href="/academy/about" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Text>About</Text>
            </Link>
            <Link href="/academy/enquiry" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Text>Enquiry</Text>
            </Link>
          </Group>
        </Container>
      </Box>
      <main>{children}</main>
      <Box
        component="footer"
        h={60}
        p="xs"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: 'var(--mantine-shadow-xs)'
        }}
      >
        <Text c="dimmed">&copy; {new Date().getFullYear()} ADMI. All rights reserved.</Text>
      </Box>
    </>
  )
}
