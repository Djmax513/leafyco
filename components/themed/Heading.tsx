import React from 'react'
import { Text as RNText } from 'react-native'
import { COLORS } from '~/theme/themeColors'

export type TitleProps= {
    children: any;
    color?: string
}

export function Title({ children, color }: TitleProps) {
    return (
        <>
            <RNText style={{
                color: color ?? COLORS.lightGray,
                fontWeight: 800,
                fontSize: 32,
            }}>
                {children}
            </RNText>
        </>
    )
}

export function SubTitle({ children, color }: TitleProps) {
    return (
        <>
            <RNText style={{
                color: color ?? COLORS.lightGray,
                fontWeight: 500,
                fontSize: 24,
            }}>
                {children}
            </RNText>
        </>
    )
}

export function Emphasis({ children, color }: TitleProps) {
    return (
        <>
            <RNText style={{
                color: color ?? COLORS.lightGray,
                fontWeight: 700,
                fontSize: 22,
            }}>
                {children}
            </RNText>
        </>
    )
}

export function Text({ children, color }: TitleProps) {
    return (
        <>
            <RNText style={{
                color: color ?? COLORS.lightGray,
                fontWeight: 400,
                fontSize: 16,
            }}>
                {children}
            </RNText>
        </>
    )
}